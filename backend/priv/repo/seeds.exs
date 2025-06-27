# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Backend.Repo.insert!(%Backend.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

unless Backend.Accounts.get_user_by_email("ricardo@nacif.xyz") do
  Backend.Accounts.create_user(%{
    email: "ricardo@nacif.xyz",
    password: "nacif"
  })
end
