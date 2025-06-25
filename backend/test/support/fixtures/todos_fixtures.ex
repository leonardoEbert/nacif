defmodule Backend.TodosFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Todos` context.
  """

  @doc """
  Generate a todo.
  """
  def todo_fixture(attrs \\ %{}) do
    {:ok, todo} =
      attrs
      |> Enum.into(%{
        description: "some description",
        done: true,
        title: "some title"
      })
      |> Backend.Todos.create_todo()

    todo
  end
end
