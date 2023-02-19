// 트리 쉐이킹: https://helloinyong.tistory.com/305, https://blog.saeloun.com/2022/11/24/tree-shaking-in-webpack-5.html, https://huns.me/development/2265
// 바벨: https://mine-it-record.tistory.com/503

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js",
        // print: "./src/print.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            // entry renamed or added -> 번들링시 번들링된 파일도 rename될거임 -> 이를 반영하기 위해 사용하는 플러그인
            title: "Caching",
            template: "./src/index.html",
        }),
    ],
    output: {
        filename: "[name].[contenthash].js", // 에셋의 콘텐츠가 변경되면 contenthash도 변경됨
        path: path.resolve(__dirname, "dist"),
        clean: true, // only used files will be generated
        assetModuleFilename: "assets/[hash][ext][query]"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                use: "babel-loader",
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"), // 실제로 변환해야 하는 모듈에만 로더 적용
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // dependency: { not: ['url'] },
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                // dependency: { not: ['url'] },
                type: "asset/resource",
            },
        ],
    },
    optimization: {
        // 서버에 /dist의 콘텐츠가 배포되면 클라이언트가 서버에 접근해 사이트와 에셋을 가져옴. 이는 시간이 많이 걸릴 수 있기 때문에 브라우저는 캐싱이라는 기술 사용. 이렇게 하면 불필요한 네트워크 트래픽을 줄이면서 사이트를 더 빨리 로드할 수 있다.
        // 그러나 새 코드를 불러올 경우에는 어려움을 느낄 수 있음.
        // webpack 컴파일로 생성된 파일의 내용이 변경되지 않는 한 캐시된 상태로 유지되도록 하는 데 필요한 설정

        // 캐시 무효화란? https://tantangerine.tistory.com/183
        // 파일명 뒤에 알파벳과 숫자를 조합해 파일을 생성하여 새로운 파일명을 업로드하여 웹사이트에서 새로운 파일이 생성되었다는 인식을 주어 기존의 캐시를 삭제하고 새로운 파일을 저장하는 방법

        // 런타임이란? https://webpack.kr/concepts/manifest/#runtime
        // 매니페스트 데이터와 함께 웹팩이 브라우저에서 실행되는 동안 모듈화된 애플리케이션을 연결하는 데 필요한 모든 코드
        // 모듈이 상호 작용할 때 모듈을 연결하는 데 필요한 로딩 및 해석 로직 포함
        // 여기에는 브라우저에 이미 로드된 모듈 연결과 그렇지 않은 모듈을 지연 로드하는 로직이 포함됨.
        runtimeChunk: "single", // runtimeChunk: 런타임 코드를 별도의 청크로 분할하는 최적화 기능, single: 생성된 모든 청크에서 공유할 런타임 파일을 생성,
        splitChunks: {
            // chunk란 웹팩에서 애플리케이션 코드를 각각 다른 파일로 나눈것. 앱의 디펜던시는 실제 앱의 코드보다 변화가 덜 자주 일어남. 이를 다른 파일로 분리시, 브라두저는 별도로 캐시하기가 한결 편해지고 앱코드만 바뀐다고 하더라도 이들을 별도로 다운로드 받지 않아도 됨.
            cacheGroups: {
                vendor: {
                    // main 번들에 node_modules 디렉터리 코드가 포함되어 있지 않아 크기가 줄어듦
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
        usedExports: true, // 사용되지 않는 import는 번들링하지 않는다.
        // minimizer: [
        //     new CssMinimizerPlugin(), // 프로덕션 모드에서만 CSS 최적화 활성화
        // ]
    },
};
