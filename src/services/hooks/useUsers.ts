import {useQuery, UseQueryOptions} from "react-query";
import {api} from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface FetchUsersResponse {
  totalCount: number;
  users: User[]
}


export async function fetchUsers (page: number): Promise<FetchUsersResponse> {
  const {data, headers} = await api.get('users', {
    params: {
      page
    }
  });
  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => {
    return {
      ...user,
      createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: 'long',
        year: 'numeric'
      }),
    }
  });

  return {users, totalCount};
}

export function useUsers (page: number, options?: UseQueryOptions) {
  return useQuery(
    ['users', page], () => fetchUsers(page),
    {
      staleTime: 1000 * 5, // 5 seconds
      ...options
    }
  );
}