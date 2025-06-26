defmodule BackendWeb.Auth.Token do
  use Joken.Config

  @impl true
  def token_config do
    default_claims()
    |> add_claim("user_id", nil, &(&1 != nil))
  end

  @impl true
  def signer do
    Joken.Signer.create("HS256", "nacif")
  end
end
