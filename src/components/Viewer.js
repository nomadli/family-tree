import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import MixedNodeElement from './MixedNodeElement';
import PureSvgNodeElement from './PureSvgNodeElement';
import '../App.css';

/*
tree props:
data:                     树的数据对象
zoomable:                 指定是否允许缩放树
translate:                指定树的偏移量,格式为{ x: number, y: number }
orientation:              指定树的方向,可以是"horizontal"或"vertical"
separation:               指定相邻节点之间的距离，可以是一个数值或一个函数
nodeSize:                 指定每个节点的大小,可以是一个数值或一个函数
pathFunc:                 指定绘制节点之间连线的函数
depthFactor:              指定节点深度的因素,用于计算节点之间的距离
collapsible:              指定是否允许折叠节点
onClick:                  指定节点的点击事件处理函数
onCollapse:               指定节点折叠事件处理函数
onExpand:                 指定节点展开事件处理函数
renderCustomNodeElement:  指定自定义节点元素的渲染函数

Node props:
nodeData:                 节点的数据对象
classNames:               节点的 CSS 类名
textLayout:               指定节点标签的布局,可以是"horizontal"或"vertical"
circleRadius:             指定节点圆圈的半径
nodeSvgShape:             指定节点形状的 SVG 路径
foreignObjectProps:       指定包含节点标签的 foreignObject 元素的 props
nodeLabelComponent:       指定节点标签的渲染函数
onClick:                  指定节点的点击事件处理函数
onRightClick:             指定节点的右键点击事件处理函数
onCollapse:               指定节点折叠事件处理函数
onExpand:                 指定节点展开事件处理函数

Link props:
linkData:                 连接两个节点的数据对象
orientation:              指定树的方向, 可以是"horizontal"或"vertical"
pathFunc:                 指定绘制连线的函数
transitionDuration:       指定连线动画的持续时间

renderCustomNodeElement props:
datum:                    当前节点的数据对象,由Tree组件传递给Node组件
toggleNode:               展开或收起节点的方法,shouldCollapseNeighborNodes=true有效
collapsed:                表示当前节点是否已经折叠
nodeProps:                所有应该传递给节点的自定义属性都包含在这个对象中
mouseEvent:               包含当前鼠标事件的对象,可以用于处理鼠标事件
*/

const countNodes = (count = 0, n) => {
  // Count the current node
  if (n.partner) {
    count += 2;
  } else {
    count += 1;
  }

  // Base case: reached a leaf node.
  if (!n.children) {
    return count;
  }

  // Keep traversing children while updating `count` until we reach the base case.
  return n.children.reduce((sum, child) => countNodes(sum, child), count);
};

const customNodeFnMapping = {
  svg: {
    description: 'Default - Pure SVG node & label (IE11 compatible)',
    fn: (rd3tProps, configs, setID, curID) => (
      <PureSvgNodeElement
        nodeDatum={rd3tProps.nodeDatum}
        toggleNode={rd3tProps.toggleNode}
        setID = {setID}
        curID = {curID}
      />
    ),
  },
  mixed: {
    description: 'MixedNodeElement - SVG `circle` + `foreignObject` label',
    fn: ({ nodeDatum, toggleNode }, configs) => (
      <MixedNodeElement
        nodeData={nodeDatum}
        triggerNodeToggle={toggleNode}
        foreignObjectProps={{
          width: configs.nodeSize.x,
          height: configs.nodeSize.y,
          x: -50,
          y: 50,
        }}
      />
    ),
  },
};

class MyTree extends Tree {
  constructor(props) {
    super(props);
    Tree.collapseNode = function (nodeDatum) {
      nodeDatum.__rd3t.collapsed = true;
    };
  }
  
  render() {
    return super.render()
  }
}

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: props.configurations.translateX,
      translateY: props.configurations.translateY,
      tipID: 0,
    };
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translateX: dimensions.width / 2.5,
      translateY: dimensions.height / 2,
    });
  }

  setTipState = (id) => {
    this.setState({tipID:id})
  }

  render() {
    const { tree, configurations } = this.props;
    return (
      <div className="column-right">
        <div className="tree-stats-container">
          <h2>{configurations.title}</h2>
          {countNodes(0, Array.isArray(tree) ? tree[0] : tree)} 位家族成员.<br />
        </div>
        <div ref={tc => (this.treeContainer = tc)} className="tree-container" onPointerDown={() => this.setState({tipID:0})}>
          <MyTree
            data={tree}
            renderCustomNodeElement={
              configurations.renderCustomNodeElement
                ? rd3tProps => customNodeFnMapping[configurations.renderCustomNodeElement].fn(rd3tProps, configurations, this.setTipState, this.state.tipID)
                : undefined
            } //mixed svg
            orientation={"vertical"}
            translate={{ x: this.state.translateX, y: this.state.translateY }}
            pathFunc={configurations.pathFunc} //step diagonal elbow straight
            collapsible={configurations.collapsible}
            initialDepth={configurations.initialDepth}
            zoomable={configurations.zoomable}
            zoom={configurations.zoom}
            scaleExtent={configurations.scaleExtent}
            nodeSize={configurations.nodeSize}
            separation={configurations.separation}
            enableLegacyTransitions={configurations.enableLegacyTransitions}
            transitionDuration={configurations.transitionDuration}
            depthFactor={configurations.depthFactor}
            styles={configurations.styles}
            shouldCollapseNeighborNodes={configurations.shouldCollapseNeighborNodes}
          />
        </div>
      </div>
    );
  }
}

export default Viewer;
