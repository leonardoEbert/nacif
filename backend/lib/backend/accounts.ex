defmodule Backend.Accounts do
  alias Backend.Repo
  alias Backend.Accounts.User

  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

  def authenticate_user(email, password) do
    user = get_user_by_email(email)

    cond do
      user && Bcrypt.verify_pass(password, user.password_hash) ->
        {:ok, user}

      user ->
        {:error, :unauthorized}

      true ->
        {:error, :not_found}
    end
  end

  def create_user(attrs) do
    %Backend.Accounts.User{}
    |> Backend.Accounts.User.changeset(attrs)
    |> Backend.Repo.insert()
  end
end
