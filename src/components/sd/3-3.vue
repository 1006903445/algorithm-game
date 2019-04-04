<template>
    <div>
    	<div class="tip">
            1、数字 1-9 只能出现一次。<br>
            2、横竖相加相等。<br>
            3、附加按钮可控制对角也相等<br>
            <label>
	        	<input type="checkbox" v-model="isDiagonal">开启对角验证
	        </label>
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
            isDiagonal: false,
        }
    },
    created(){
        var beginTime = new Date().getTime();
        this.createArr()
        console.log("数独生成完毕，耗时："+((new Date().getTime())-beginTime)/1000+"秒！");
    },
    watch: {
    	isDiagonal(){
    		this.createArr();
    	},
    },
    methods: {
        createArr(){
            try{
                for(let i=0;i<3;i++){
                    for(let j=0;j<3;j++){
                        if(!this.sdArr[i]){
                            this.sdArr[i] = new Array(3)
                        }
                        this.sdArr[i][j] = '';
                    }
                }
                let meanNum = 15; //3*3的均值是15
                this.setArr(3,3)
                xArrfor:
                for(let i=0;i<3;i++){
                    yArrfor:
                    for(let j=0;j<3;j++){
                        let sumX = this.getSumX(i, this.sdArr);
                        let sumY = this.getSumY(j, this.sdArr);
                        let sumXY = meanNum;
                        if(sumX != sumY || sumX != meanNum){
                        	this.createArr();
                        	return;
                            break xArrfor;
                        }
                    }
                }
                // this.$forceUpdate() //手动刷新视图
            }catch(e){
                // console.log(e)
                //如果因为超出浏览器的栈限制出错，就重新运行。
                this.createArr();
            }
        },
        getSumX(x, allArr){
        	// 获取所在行的值。
            let sum = 0;
            for(var i=0;i<3;i++){
                sum+=allArr[x][i]
            }
            return sum;
        },
        getSumY(y, allArr){
        	// 获取所在行的值。
            let sum = 0;
            for(var i=0;i<3;i++){
                sum+=allArr[i][y]
            }
            return sum;
        },
        getSumDiagonal(allArr){
        	// 验证对角之和
        	let diagonalXY = [[0,0],[1,1],[2,2]];
        	let diagonalYX = [[0,2],[1,1],[2,0]];
        	let sumXY = 0;
        	let sumYX = 0;
        	for(var i=0;i<3;i++){
                sumXY+=allArr[diagonalXY[i][0]][diagonalXY[i][1]]
                sumYX+=allArr[diagonalYX[i][0]][diagonalYX[i][1]]
            }
            return sumXY == sumYX ? sumXY : false;
        },
        setArr(x=3,y=3){
            // 生产数组 默认3*3
            var numArr = [];
            if(this.isDiagonal){
            	numArr = [1,2,3,4,6,7,8,9];
            }else{
            	numArr = [1,2,3,4,5,6,7,8,9];
            }
            var sortedNumArr = numArr.sort(() => {return Math.random()-0.5>0?-1:1});
            for(let i=0;i<x;i++){
                for(let j=0;j<y;j++){
                	if(this.isDiagonal && i==1 && j==1){
                		this.sdArr[i][j] = 5;
                	}else{
                    	this.sdArr[i][j] = sortedNumArr.pop();
                	}
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
