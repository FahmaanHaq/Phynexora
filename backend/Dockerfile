FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY src/Phynexora.Api/Phynexora.Api.csproj src/Phynexora.Api/
RUN dotnet restore src/Phynexora.Api/Phynexora.Api.csproj
COPY . .
RUN dotnet publish src/Phynexora.Api/Phynexora.Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://+:8080
RUN mkdir -p /app/App_Data && chown -R app /app/App_Data
EXPOSE 8080
USER app
ENTRYPOINT ["dotnet", "Phynexora.Api.dll"]
