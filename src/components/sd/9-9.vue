<template>
    <div>
        <div class="tip">
            1、数字 1-9 在每一行只能出现一次。<br>
            2、数字 1-9 在每一列只能出现一次。<br>
            3、数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。<br>
        </div>
        <div class="sd">
            <div class="tr" v-for="item in sdArr">
                <div class="td" v-for="x in item">
                    <span>{{x}}</span>
                </div>    
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            sdArr: [],
        }
    },
    created(){
        var beginTime = new Date().getTime();
        this.createArr()
        console.log("数独生成完毕，耗时："+((new Date().getTime())-beginTime)/1000+"秒！");
    },
    methods: {
        createArr(){
            try{
                for(let i=0;i<9;i++){
                    for(let j=0;j<9;j++){
                        if(!this.sdArr[i]){
                            this.sdArr[i] = new Array(9)
                        }
                        this.sdArr[i][j] = '';;
                    }
                }
                let allNum = [1,2,3,4,5,6,7,8,9];
                this.setDiagonalArr(2,2)
                this.setDiagonalArr(5,5)
                this.setDiagonalArr(8,8)
                xArrfor:
                for(let i=0;i<9;i++){
                    yArrfor:
                    for(let j=0;j<9;j++){
                        if(this.sdArr[i][j]){
                            continue yArrfor;
                        }
                        var xArr = this.getXArr(i,this.sdArr);
                        var yArr = this.getYarr(j,this.sdArr);
                        var gridArr = this.getGridArr(i,j,this.sdArr);
                        var connectArr = this.getConnectArr(xArr,yArr,gridArr);
                        var minusArr = this.getMinusArr(allNum,connectArr)

                        if(minusArr.length == 0){
                            this.createArr();
                            return;
                            break xArrfor;
                        }
                        let getNum;
                        do{
                            getNum = minusArr[Math.floor(Math.random()*minusArr.length)];
                        }while(connectArr.some(x => x==getNum));
                        this.sdArr[i][j] = getNum;
                    }
                }
                // this.$forceUpdate() //手动刷新视图
            }catch(e){
                // console.log(e)
                //如果因为超出浏览器的栈限制出错，就重新运行。
                this.createArr();
            }
        },
        getXArr(x, allArr){
            // 获取所在行的值。
            let arr = [];
            for(var i=0;i<9;i++){
                if(allArr[x][i]){
                    arr.push(allArr[x][i])
                }
            }
            return arr;
        },
        getYarr(y, allArr){
            // 获取所在列的值。            
            let arr = [];
            for(var i=0;i<9;i++){
                if(allArr[i][y]){
                    arr.push(allArr[i][y])
                }
            }
            return arr;
        },
        getGridArr(x,y,allArr){
            // 小宫格的数组
            let arr = [];
            let nX = parseInt(x/3)*3;
            let nY = parseInt(y/3)*3;
            for(let i=nX;i<nX+3;i++){
                for(let j=nY;j<nY+3;j++){
                    if(allArr[i][j]){
                        arr.push(allArr[i][j])
                    }
                }
            }
            return arr;
        },
        getConnectArr(xArr,yArr,gridArr){
            let nXArr = new Set(xArr);
            let nYArr = new Set(yArr);
            let nGridArr = new Set(gridArr);
            let nArr = [...nXArr,...nYArr,...nGridArr];
            return [...new Set(nArr)]
        },
        getMinusArr(allArr, connectArr){
            let nConnectArr = new Set(connectArr);
            let nArr = allArr.filter(x => !nConnectArr.has(x));
            // console.log(nArr)
            return nArr;
        },
        setDiagonalArr(x,y){
            // 为对角线上的三个三宫格随机生成。
            var numArr = [1,2,3,4,5,6,7,8,9];
            let nX = parseInt(x/3)*3;
            let nY = parseInt(y/3)*3;
            var sortedNumArr= numArr.sort(function(){return Math.random()-0.5>0?-1:1});
            for(let i=nX;i<nX+3;i++){
                for(let j=nY;j<nY+3;j++){
                    this.sdArr[i][j] = sortedNumArr.pop();
                }
            }
        }
    },
}
</script>
<style lang="less">
    .tip{
        font-size: 12px;
        padding: 10px 0;
        width: 300px;
        margin: 0 auto;
        overflow: auto;
        text-align: justify;
    }
    .sd{
        margin: auto;
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 300px;
        border: 2px solid #333;
        font-size: 0;

        .tr{
            display: inline-block;
            flex: 1;
            display: flex;
            width: 100%;
            height: 1/3*100%;
            border-bottom: 1px dashed #666;
            
            &:nth-child(3n){
                border-bottom-style: solid;
            }
            &:last-child{
                border-bottom: 0;
            }

            .td{
                flex: 1;
                display: flex;
                align-items:center;
                justify-content:center;
                width: 1/3*100%;
                height: 100%;
                font-size: 20px;
                border-right: 1px dashed #666;

                span{
                    display: block;
                }
                &:nth-child(3n){
                    border-right-style: solid;
                }
                &:last-child{
                    border-right: 0
                }
                
            }
        }
    }
</style>
