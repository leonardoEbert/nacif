defmodule BackendWeb.Plugs.Authenticate do
  import Plug.Conn
  alias BackendWeb.Auth.Token

  def init(opts), do: opts

  def call(conn, _opts) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, claims} <- Token.verify_and_validate(token, Token.signer()) do
      assign(conn, :jwt_claims, claims)
    else
      _ ->
        conn
        |> send_resp(:unauthorized, "Unauthorized")
        |> halt()
    end
  end
end
