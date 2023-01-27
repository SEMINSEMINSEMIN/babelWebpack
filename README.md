* package.json 설정
    ```
    npm init -y
    ```

* babel-core, babel-cli 설치
    ```
    npm install --save-dev @babel/core @babel/cli
    ```

* @babel/preset-env 설치
    ```
    npm install --save-dev @babel/preset-env
    ```
    * 필요한 플러그인들을 프로젝트 지원 환경에 맞춰 동적으로 결정
    * 프로젝트 지원 환경은 Browserslist 형식으로 .browserslistrc 파일에 설정 가능
    * 프로젝트 환경 설정 작업 생략시 기본값으로 설정됨

* webpack 설치
    ```
    npm install --save-dev webpack webpack-cli
    ```

* webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+/ES.NEXT 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링하도록 babel-loader 설치
    ```
    npm install --save-dev babel-loader
    ```
* [소스 맵이란?](https://joshua1988.github.io/webpack-guide/devtools/source-map.html#%EC%86%8C%EC%8A%A4-%EB%A7%B5)
    * 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능
    * 압축하여 배포한 파일에서 에러가 난다면 어떻게 디버깅 ? => 소스 맵을 이용해 배포용 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인

* babel-polyfill 설치
    ```
    npm install @babel/polyfill
    ```
    * babel을 사용해 ES6+/ES.NEXT 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링 해도 브라우저가 지원하지 않는 코드가 남아있을 수 있다. 예를 들어 ES6에서 추가된 Promise, Object.assign, Array.from 등은 ES5 사양으로 트랜스파일링해도 ES5 사양에 대체할 기능이 없기 때문에 트랜스파일링되지 못하고 그대로 남는다. 이를 해결하기 위해서는 @babel/polyfill을 설치해야 한다.
    * babel-polyfill은 개발 환경에서만 사용하는 것이 아니라 실제 운영 환경에서도 사용해야 ㅎ나다. 따라서 개발용 의존성으로 설치하는 --save-dev 옵션을 지정하지 않는다.