defmodule BackendWeb.SessionController do
  use BackendWeb, :controller
  alias Backend.Accounts
  alias BackendWeb.Auth.Token

  def create(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        {:ok, token, _claims} = Token.generate_and_sign(%{"user_id" => user.id}, Token.signer())
        json(conn, %{message: "Login successful", user_id: user.id, token: token})

      {:error, :unauthorized} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "Invalid credentials"})

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User not found"})
    end
  end
end
