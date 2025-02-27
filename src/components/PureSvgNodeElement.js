import React from 'react';
import Card from './Card';

const g_TouchDev = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

class Family extends React.Component {
  constructor(props) {
    super(props);
    this.actions = {
      touch: {
        onPointerDown: (ev) => this.touchDownAction(this.props.node, this.props.curID, this.props.toggleNode, this.props.setID, ev),
        onPointerUp: (ev) => this.touchUpAction(this.props.node, this.props.curID, ev),
      },
      mouse: {
        onClick: this.props.toggleNode,
        onMouseEnter: () => this.props.setID(this.props.node.id),
        onMouseLeave: () => this.props.setID(0),
      },
      ptouch: {
        onPointerDown: (ev) => this.touchDownAction(this.props.node.partner, this.props.curID, this.props.toggleNode, this.props.setID, ev),
        onPointerUp: (ev) => this.touchUpAction(this.props.node.partner, this.props.curID, ev),
      },
      pmouse: {
        onClick: this.props.toggleNode,
        onMouseEnter: () => this.props.setID(this.props.node.partner.id),
        onMouseLeave: () => this.props.setID(0),
      }
    };
  }
  tipView = (curID, nodeDatum, lorx, cy, left) => {
    if (curID !== nodeDatum.id && curID !== -nodeDatum.id) {
      return (<></>);
    }
    return (
      <Card nodeDatum={nodeDatum} lorx={lorx} cy={cy} left={left} />
    );
  };

  nameNode = (node, bgcolor, transform) => {
    return (
      <React.Fragment>
        <circle cx={transform.x} cy={transform.y} r={50} fill={bgcolor} stroke={bgcolor} />
        <g className="rd3t-label">
          <text className="rd3t-label__title" x={transform.x} y={5 + transform.y} textAnchor="middle">
            {node.name}
          </text>
        </g>
      </React.Fragment>
    );
  };

  imageNode = (node, bgcolor, transform) => {
    return (
      <React.Fragment>
        <defs>
          <clipPath id={node.id}>
            <circle cx={transform.x} cy={transform.y} r={50} />
          </clipPath>
        </defs>

        <circle cx={transform.x} cy={transform.y} r={50} fill={"transparent"} stroke={bgcolor} />
        <image href={`${process.env.PUBLIC_URL}/img/${node.image}`} x={-50 + transform.x} y={-50 + transform.y} height={100} width={100} clipPath={`url(#${node.id})`} />
        <g className="rd3t-label">
          <text className="rd3t-label__title" x={transform.x} y={-60+transform.y} textAnchor="middle">
            {node.name}
          </text>
        </g>
      </React.Fragment>
    );
  }

  touchUpAction = (node, curID, ev) => {
    ev.stopPropagation();
    if (curID !== 0) {
      this.props.setID(-node.id);
    } 
  }

  touchDownAction = (node, curID, toggleNode, setID, ev) => {
    ev.stopPropagation();
    if (-node.id === curID) {
      setID(0)
      toggleNode(ev)
      return
    }
    setID(node.id)
  }

  render() {
    let { node, curID, bgcolor } = this.props;
    if (!node.partner) {
      return (
        <g {...this.actions[g_TouchDev ? 'touch' : 'mouse']}>
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
        <g {...this.actions[g_TouchDev ? 'touch' : 'mouse']}>
          {node.image ?
            this.imageNode(node, bgcolor, { x: 0, y: 0 }) :
            this.nameNode(node, bgcolor, { x: 0, y: 0 })
          }
          {this.tipView(curID, node, -60, 0, false)}
        </g>
        <g {...this.actions[g_TouchDev ? 'ptouch' : 'pmouse']}>
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
