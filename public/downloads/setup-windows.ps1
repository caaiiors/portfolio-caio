# Script de pós-formatação do Windows
# Instala aplicativos e configura o Git automaticamente.
#
# Uso: clique em setup-windows.bat ou rode no PowerShell:
#   powershell -ExecutionPolicy Bypass -File .\setup-windows.ps1
#

$ErrorActionPreference = 'Stop'

$GitEmail = 'caiorissasilveiraa@gmail.com'
$GitName = 'caiorissa'

function Log {
  param([string]$Message)
  Write-Host ""
  Write-Host "==> $Message"
}

function Test-IsAdmin {
  $current = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($current)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Ensure-Winget {
  if (Get-Command winget -ErrorAction SilentlyContinue) {
    return
  }

  Log "winget não encontrado. Instalando App Installer..."
  $bundle = "$env:TEMP\Microsoft.DesktopAppInstaller.msixbundle"
  Invoke-WebRequest -Uri 'https://aka.ms/getwinget' -OutFile $bundle -UseBasicParsing
  Add-AppxPackage -Path $bundle
  Remove-Item $bundle -Force -ErrorAction SilentlyContinue

  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    throw 'Não foi possível instalar o winget. Instale o App Installer pela Microsoft Store e rode o script de novo.'
  }
}

function Install-WingetApp {
  param(
    [string]$Id,
    [string]$Label
  )

  Log "Instalando $Label..."
  winget install --id $Id -e `
    --accept-source-agreements `
    --accept-package-agreements `
    --disable-interactivity `
    --scope user `
    --force 2>&1 | Out-Host

  if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq -1978335189) {
    return
  }

  throw "Falha ao instalar $Label (winget exit code $LASTEXITCODE)"
}

function Install-Equilotl {
  Log 'Instalando Equilotl (Equicord)...'

  $installDir = Join-Path $env:LOCALAPPDATA 'Equilotl'
  $exePath = Join-Path $installDir 'Equilotl.exe'
  $url = 'https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.exe'

  New-Item -ItemType Directory -Force -Path $installDir | Out-Null
  Invoke-WebRequest -Uri $url -OutFile $exePath -UseBasicParsing

  $desktop = [Environment]::GetFolderPath('Desktop')
  $shortcutPath = Join-Path $desktop 'Equilotl.lnk'
  $shell = New-Object -ComObject WScript.Shell
  $shortcut = $shell.CreateShortcut($shortcutPath)
  $shortcut.TargetPath = $exePath
  $shortcut.WorkingDirectory = $installDir
  $shortcut.Save()

  Log "Equilotl instalado em $exePath"
}

function Configure-Git {
  Log 'Configurando Git...'

  if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Log 'Git não encontrado. Instalando...'
    Install-WingetApp -Id 'Git.Git' -Label 'Git'
  }

  git config --global user.email $GitEmail
  git config --global user.name $GitName

  Write-Host ""
  Write-Host 'Git configurado:'
  git config --global --list | Select-String '^user\.(name|email)='
}

function Main {
  if (-not (Test-IsAdmin)) {
    Log 'Pedindo permissão de administrador...'
    $scriptPath = $MyInvocation.MyCommand.Path
    Start-Process powershell.exe -Verb RunAs -ArgumentList @(
      '-NoProfile',
      '-ExecutionPolicy', 'Bypass',
      '-File', "`"$scriptPath`""
    )
    return
  }

  Log 'Iniciando instalação...'

  Ensure-Winget

  Install-WingetApp -Id 'Brave.Brave' -Label 'Brave Browser'
  Install-WingetApp -Id 'Valve.Steam' -Label 'Steam'
  Install-WingetApp -Id 'Discord.Discord' -Label 'Discord'
  Install-WingetApp -Id 'Apple.AppleMusicWin' -Label 'Apple Music'

  Install-Equilotl
  Configure-Git

  Log 'Tudo pronto!'
  Write-Host ''
  Write-Host 'Aplicativos instalados:'
  Write-Host '  - Brave Browser'
  Write-Host '  - Steam'
  Write-Host '  - Discord'
  Write-Host '  - Apple Music'
  Write-Host '  - Equilotl (Equicord)'
  Write-Host '  - Git'
  Write-Host ''
  Write-Host 'Abra o Equilotl (atalho na área de trabalho) para configurar o Equicord no Discord.'
  Write-Host ''
  Read-Host 'Pressione Enter para fechar'
}

Main
