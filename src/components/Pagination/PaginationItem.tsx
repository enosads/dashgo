import {Button, ButtonProps as ChakraButtonProps} from "@chakra-ui/react";
import {queryClient} from "../../services/queryClient";
import {fetchUsers} from "../../services/hooks/useUsers";

interface PaginationItemProps extends ChakraButtonProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem (
  {
    onPageChange,
    isCurrent = false,
    number
  }: PaginationItemProps) {

  async function handlePrefetchPage (page: number) {
    await queryClient.prefetchQuery(
      ['users', page],
      async () => {
        const {users} = await fetchUsers(page);
        return users;
      },
    );
  }


  if (isCurrent) {
    return (
      <Button
        size='sm'
        fontSize='xs'
        width='4'
        colorScheme='pink'
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    );
  }
  return (
    <Button
      size='sm'
      fontSize='xs'
      width='4'
      bg='gray.700'
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
      onMouseEnter={() => handlePrefetchPage(number)}
    >
      {number}
    </Button>
  );
}