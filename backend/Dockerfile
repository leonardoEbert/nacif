FROM elixir:1.18.4-otp-27-alpine

RUN apk add --no-cache build-base postgresql-dev bash git

WORKDIR /app

COPY . .

RUN mix local.hex --force && \
    mix local.rebar --force

RUN mix deps.get

RUN mix clean && \
    mix compile

EXPOSE 4000

CMD ["mix", "phx.server"]
