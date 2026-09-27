@echo off
chcp 65001 >nul
echo.
echo ===============================================
echo   МатрасОнлайн - Установщик для Windows
echo ===============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Node.js не найден!
    echo.
    echo Скачай и установи Node.js 18 или 20 LTS:
    echo https://nodejs.org/ru/download/
    echo.
    echo После установки перезапусти этот скрипт.
    echo.
    pause
    exit /b 1
)

REM Check Node.js version (need 18.x or 20.x)
for /f "tokens=2 delims=v" %%i in ('node --version 2^>nul') do set NODE_VER=%%i
echo [i] Node.js версия: v%NODE_VER%

REM Check if version is 18 or 20
echo %NODE_VER% | findstr /R "^1[89]\..* ^20\..*" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Требуется Node.js 18 или 20!
    echo Твоя версия: v%NODE_VER%
    echo.
    echo Скачай Node.js 18/20:
    echo https://nodejs.org/ru/download/
    echo.
    echo После установки перезапусти этот скрипт.
    echo.
    pause
    exit /b 1
)

echo.
echo [i] Устанавливаю зависимости...
npm install --loglevel error

if %ERRORLEVEL% NEQ 0 (
    echo [!] Ошибка при установке зависимостей!
    pause
    exit /b 1
)

echo.
echo ===============================================
echo   [OK] Установка завершена!
echo ===============================================
echo.
echo Команды:
echo   npm run dev   - Запустить на localhost:3000
echo   npm run build - Собрать для продакшена
echo   npm start     - Запустить собранный сайт
echo.
echo Админ-панель: http://localhost:3000/admin
echo Пароль: admin2024
echo.
pause
