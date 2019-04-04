<template>
  	<div class="home">
  		<div class="tab-list">
            <router-link to="/sd/3-3">3*3</router-link>
  			<router-link to="/sd/9-9">9*9</router-link>
  		</div>
  		<div class="content-box">
        	<router-view/>
  		</div>
 	</div>
</template>

<script>
export default {
  	
}
</script>
<style lang="less">
	.tab-list{
		margin-bottom: 10px;

		a{
			padding: 2px 5px;
            cursor: pointer;
		}
	}
</style>
