import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTodoList, addTodo } from "../api/todoListApi";

export const useGetTodoList = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchAllTodoList,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
