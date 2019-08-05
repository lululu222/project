require.config({
    baseUrl:"model",
    paths:{
        tab:"tab",
        jq:"../libs/js/jquery.1.12.4.js"
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
