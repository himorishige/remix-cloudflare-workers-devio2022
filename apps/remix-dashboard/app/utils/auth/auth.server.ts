import type { Error } from '~/types';

import type { Session } from '@remix-run/cloudflare';
import type { User, SupabaseClient } from '@supabase/supabase-js';

type AuthForm = {
  email: string;
  password: string;
  supabase: SupabaseClient;
};

export async function setSBAuth(
  session: Session,
  supabase: SupabaseClient,
): Promise<void> {
  const userAccessToken = session.get('access_token');
  supabase.auth.setAuth(userAccessToken);
}

export function setAuthSession(
  session: Session,
  accessToken: string,
  refreshToken: string,
): Session {
  session.set('access_token', accessToken);
  session.set('refresh_token', refreshToken);

  return session;
}

function hasAuthSession(session: Session): boolean {
  try {
    return session.has('access_token');
  } catch {
    return false;
  }
}

export async function hasActiveAuthSession(
  session: Session,
  supabase: SupabaseClient,
): Promise<boolean> {
  try {
    if (!hasAuthSession(session)) return false;

    const { user, error } = await getUserByAccessToken(
      session.get('access_token'),
      supabase,
    );

    if (error || !user) return false;
    return true;
  } catch {
    return false;
  }
}

export async function refreshUserToken(
  session: Session,
  supabase: SupabaseClient,
): Promise<LoginReturn> {
  try {
    const { data, error } = await supabase.auth.api.refreshAccessToken(
      session.get('refresh_token'),
    );

    if (error || !data || !data.access_token || !data.refresh_token) {
      return { error: error?.message || 'Something went wrong' };
    }

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch {
    return { error: 'Something went wrong' };
  }
}

type LoginReturn = {
  accessToken?: string;
  refreshToken?: string;
} & Error;
export async function loginUser({
  email,
  password,
  supabase,
}: AuthForm): Promise<LoginReturn> {
  try {
    const { data: sessionData, error: loginError } =
      await supabase.auth.api.signInWithEmail(email, password);

    if (
      loginError ||
      !sessionData ||
      !sessionData.access_token ||
      !sessionData.refresh_token
    ) {
      return { error: loginError?.message || 'Something went wrong' };
    }

    return {
      accessToken: sessionData.access_token,
      refreshToken: sessionData.refresh_token,
    };
  } catch {
    return { error: 'Something went wrong' };
  }
}

type RegisterReturn = {
  user?: User;
} & Error;
export async function registerUser({
  email,
  password,
  supabase,
}: AuthForm): Promise<RegisterReturn> {
  try {
    const { user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !user) {
      return { error: signUpError?.message || 'Something went wrong' };
    }

    return { user };
  } catch {
    return {
      error: 'Something went wrong',
    };
  }
}

type SignOutUserReturn = {
  done: boolean;
} & Error;
export async function signOutUser(
  session: Session,
  supabase: SupabaseClient,
): Promise<SignOutUserReturn> {
  try {
    const { error } = await supabase.auth.api.signOut(
      session.get('access_token'),
    );
    if (error) {
      return { done: false, error: error?.message || 'Something went wrong' };
    }
    return { done: true };
  } catch {
    return {
      done: false,
      error: 'Something went wrong',
    };
  }
}

type GetUserReturn = {
  user?: User;
} & Error;
export async function getUserByAccessToken(
  accessToken: string,
  supabase: SupabaseClient,
): Promise<GetUserReturn> {
  try {
    const { user, error } = await supabase.auth.api.getUser(accessToken);

    if (error || !user) {
      return { error: error?.message || 'Something went wrong' };
    }

    return { user };
  } catch {
    return {
      error: 'Something went wrong',
    };
  }
}

// type SendResetPasswordEmailForUserArgs = {
//   email: string;
//   redirectTo: string;
// };
// export async function sendResetPasswordEmailForUser({
//   email,
//   redirectTo,
// }: SendResetPasswordEmailForUserArgs): Promise<Error> {
//   try {
//     const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
//       email,
//       {
//         redirectTo,
//       },
//     );

//     if (error || data === null) {
//       return { error: error?.message || 'Something went wrong' };
//     }
//     return {};
//   } catch (error) {
//     return {
//       error: 'Something went wrong',
//     };
//   }
// }

// type ResetPasswordForUserArgs = {
//   password: string;
//   session: Session;
// };
// type ResetPasswordReturn = {
//   user?: User;
// } & Error;
// export async function resetPasswordForUser({
//   password,
//   session,
// }: ResetPasswordForUserArgs): Promise<ResetPasswordReturn> {
//   try {
//     const { user, error } = await supabaseClient.auth.api.updateUser(
//       session.get('access_token'),
//       {
//         password,
//       },
//     );

//     if (error || !user) {
//       return { error: error?.message || 'Something went wrong' };
//     }

//     return { user };
//   } catch {
//     return {
//       error: 'Something went wrong',
//     };
//   }
// }
