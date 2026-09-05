@echo off
setlocal
set "PS1=%~dp0setup-windows.ps1"

if not exist "%PS1%" (
  echo Baixando setup-windows.ps1...
  powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "Invoke-WebRequest -Uri 'https://caiorissa.vercel.app/downloads/setup-windows.ps1' -OutFile '%PS1%' -UseBasicParsing"
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%"
