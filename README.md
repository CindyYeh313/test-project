# 104z-temp

104z 專案模板

## :inbox_tray: **拉取使用此模板的方式**

* 使用 104z/create-vue [工具專案連結](https://github.com/104corp/create-vite)
* 或其他建立專案工具

## :whale: **104z 專案模板的使用架構**

### [VSCode](https://code.visualstudio.com/) + [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
docker 環境內使用專案 & nginx 反代理

## :rocket: **104z 專案模板建議的 vscode extension**

* [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) 
* [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
* [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
* [stylelint-plus](https://marketplace.visualstudio.com/items?itemName=hex-ci.stylelint-plus)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [CodeMetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)

## :hammer_and_wrench: **使用104z 專案模板的前置準備**

:white_check_mark: 下載 [VSCode](https://code.visualstudio.com/)  
:white_check_mark: 下載 [docker](https://www.docker.com/get-started/)  
:white_check_mark: VSCode 安裝 [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)  
:white_check_mark: 調整專案名稱 `104z-temp` -> `your project name` 
* **package.json :**
    * `name`
* **.devcontainer/docker-compose.yml :**
    * `service project name`
    * `project container_name`
    <br/>
    <img width="251" alt="image" src="https://user-images.githubusercontent.com/50346230/174241423-c7fbe5ea-2463-47fb-930e-78c345c9f98d.png">

* **.devcontainer/devcontainer.json :**
    * `name`
    * `service`



## :fire: **104z 專案模板專案啟用方式**

1. 使用 vscode remote container 啟動 docker-compose 建立專案

2. 安裝依賴套件

    ```sh
    npm i 
    ```

3. 啟動專案

    ```sh
    npm run dev 
    ```


## :package: 打包壓縮專案

```sh
npm run build
```

## :mag: 專案內 linter 檢查

```sh
npm run lint
```