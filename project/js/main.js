require.config({
    baseUrl:"model",
    paths:{
        tab:"http://127.0.0.1/js%20project/project/model/tab.js",
        jq:"http://127.0.0.1/js%20project/project/libs/js/jquery.1.12.4.js"
    }
})

require(["jq","tab"],function(_,t){
    // console.log(l)
    // console.log(t)
    // console.log(f)
    // console.log($)

    new t({
        btns:$(".option_title").children(".only"),
        tabs:$(".glist")
    })

})
