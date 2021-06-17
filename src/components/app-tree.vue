<template>
	<div class="content">
    <transition name="fade">
      <div v-if="ShowTree" class="tree">
        <!-- default-expand-all 默认展开所有节点 -->
        <el-tree
          class="clearfix"
          ref="tree"
          show-checkbox
          :data="treeData"
          @node-click="handleNodeClick"
          @check="handleCheck"
          node-key="id" 
          :default-checked-keys="checkNodes">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <img class="iconPNG school" src="../assets/images/treePNG/school.png" alt="" v-if="node.childNodes.length>0 && node.level==1">
            <img class="iconPNG" src="../assets/images/treePNG/partD.png" alt="" v-if="node.childNodes.length>0 && node.level!=1">
            <img class="iconPNG" src="../assets/images/treePNG/part1.png" alt="" v-if="node.childNodes.length==0">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </transition>
    <div v-if='showLine' :class="ShowTree ? 'hiddenTree' : 'showTree'" @click="hiddenTree()">
      <i class="el-icon-caret-left toLeft" v-if="ShowTree"></i>
      <i class="el-icon-caret-right toRight" v-if="!ShowTree"></i>
    </div>
	</div>
</template>
<script>
	export default {
		name:'app-tree',
    props:['treeData','showLine','checkNodes'],
    computed:{
      ShowTree(){
        return this.$store.getters.SHOW_TREE
      }
    },
		data(){
			return {
         defaultProps: {
          children: 'children',
          label: 'label',
        },
        checkedData:[],
      }
		},
		methods:{
			getTreeCheckedNodes(){
				let arr = this.$refs.tree.getCheckedNodes(true)
			},
      handleNodeClick(data,node){
        this.$emit('clickItem',node)
      },
      hiddenTree(){
        if(this.ShowTree == true){
          this.$store.commit('SHOW_TREE',false)
        }else{
          this.$store.commit('SHOW_TREE',true)
        }
      },
      handleCheck(checkedNodes,checkedKeys){
        this.checkedData = []
        checkedKeys.checkedNodes.forEach(item=>{
          if(!item.children){
            this.checkedData.push(item)
          }
        })
        this.$emit('checkedData',this.checkedData)
      }
		},
    mounted(){
    }
	}
</script>
<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .content{
    height: 100%;
    font-size: 80%;
    width: 100%;
    margin-right: 15px;
    float: left;
    position: relative;
  }
  .tree{
    height: 100%;
    overflow:auto;
    border-right: 1px solid #ccc;
  }
  .hiddenTree{
    width: 10px;
    height: 40px;
    border-radius: 30%;
    background: #409EFF;
    position: absolute;
    /*left: 97%;*/
    left: 2%;
    top: 200px;
    cursor: pointer;
  }

  i{
    color: #fff;
  }

  .showTree{
    width: 10px;
    height: 40px;
    border-radius: 30%;
    background: #409EFF;
    position: absolute;
    top: 200px;
    left: 3%;
    cursor: pointer;
    z-index: 10;
  }

  .hiddenTree .toLeft{
    margin:10px 0 0 1px;
  }

  .showTree .toRight{
    margin:13px 0 0 -6px;
  }

  .fade-enter-active,.fade-leave-active{
    transition:transform 1s;
  }

  .fade-enter,.fade-leave-to{
    transform:translateX(-300px);
  }
  .iconPNG{
    width: 15px;
    margin-right: 5px;
  }
  .school{
    width: 18px;
  }

  .custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left:  5px;
  }
</style>