import React from 'react';
import Card from './Card';

class Family extends React.Component {
  tipView = (curID, nodeDatum, lorx, cy, left) => {
    if (curID !== nodeDatum.id) {
      return (<></>);
    }
    return (
      <Card nodeDatum={nodeDatum} lorx={lorx} cy={cy} left={left} />
    );
  };

  nameNode = (node, bgcolor, ransform) => {
    return (
      <React.Fragment>
        <circle cx={ransform.x} cy={ransform.y} r={50} fill={bgcolor} stroke={bgcolor} />
        <g className="rd3t-label">
          <text className="rd3t-label__title" x={ransform.x} y={5 + ransform.y} textAnchor="middle">
            {node.name}
          </text>
        </g>
      </React.Fragment>
    );
  };

  imageNode = (node, bgcolor, ransform) => {
    return (
      <React.Fragment>
        <defs>
          <clipPath id="circleView">
            <circle cx={1 + ransform.x} cy={1 + ransform.y} r="49" />
          </clipPath>
        </defs>

        <circle cx={ransform.x} cy={ransform.y} r={50} fill={"transparent"} stroke={bgcolor} />
        <image href={`${process.env.PUBLIC_URL}/img/${node.image}`} x={-50 + ransform.x} y={-50 + ransform.y} height={100} width={100} clipPath="url(#circleView)" />
        <g className="rd3t-label">
          <text className="rd3t-label__title" x={ransform.x} y={-60+ransform.y} textAnchor="middle">
            {node.name}
          </text>
        </g>
      </React.Fragment>
    );
  }

  render() {
    let { node, toggleNode, setID, curID, bgcolor } = this.props;
    if (!node.partner) {
      return (
        <g onClick={toggleNode} onMouseEnter={() => setID(node.id)} onMouseLeave={() => setID(0)}>
          {node.image ?
            this.imageNode(node, bgcolor, { x: 0, y: 0 }) :
            this.nameNode(node, bgcolor, { x: 0, y: 0 })
          }
          {this.tipView(curID, node, 60, 0, true)}
        </g>
      );
    }
    return (
      <React.Fragment>
        <g onClick={toggleNode} onMouseEnter={() => setID(node.id)} onMouseLeave={() => setID(0)}>
          {node.image ?
            this.imageNode(node, bgcolor, { x: 0, y: 0 }) :
            this.nameNode(node, bgcolor, { x: 0, y: 0 })
          }
          {this.tipView(curID, node, -60, 0, false)}
        </g>
        <g onClick={toggleNode} onMouseEnter={() => setID(node.partner.id)} onMouseLeave={() => setID(0)}>
          {node.partner.image ?
            this.imageNode(node.partner, bgcolor, { x: 105, y: 0 }) :
            this.nameNode(node.partner, bgcolor, { x: 105, y: 0 })
          }
          {this.tipView(curID, node.partner, 160, 0, true)}
        </g>
      </React.Fragment>
    );
  };
};

const PureSvgNodeElement = ({ nodeDatum, toggleNode, setID, curID }) => {
  let props = {
    bgcolor: "#6A9956",
    node: nodeDatum,
    toggleNode: toggleNode,
    setID: setID,
    curID: curID,
  };

  if (nodeDatum.death) {
    props.bgcolor = "#8B8B8B";
  }

  return <Family {...props} />;
};

export default PureSvgNodeElement;
