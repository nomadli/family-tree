import React from 'react';
import Card from './Card';

const textLayout = {
  vertical: {
    ntitle: {
      textAnchor: 'middle',
      x: 0,
      y: 5,
    },
    ititle: {
      textAnchor: 'start',
      x: 60,
      y: 6,
    },
  },
  horizontal: {
    ntitle: {
      textAnchor: 'start',
      y: -60,
    },
    ititle: {
      textAnchor: 'start',
      y: -60,
    },
  },
};

const tipView = (curID, orientation, nodeDatum) => {
  if (curID != nodeDatum.id) {
    return(<></>);
  }
  return (
    <Card orientation={orientation} nodeDatum={nodeDatum}/>
  );
};

const nameNode = (nodeDatum, orientation, toggleNode, setID, curID, bgcolor) => {
  return (
    <React.Fragment>
      <g onClick={toggleNode} onMouseEnter={() => setID(nodeDatum.id)} onMouseLeave={() => setID(0)}>
        <circle r={50} fill={bgcolor} stroke={bgcolor}></circle>
        <g className="rd3t-label">
          <text className="rd3t-label__title" {...textLayout[orientation].ntitle}>
            {nodeDatum.name}
          </text>
        </g>
      </g>
      {tipView(curID, orientation, nodeDatum)}
    </React.Fragment>
  );
};

const imageNode = (nodeDatum, orientation, toggleNode, setID, curID, bgcolor) => {
  return (
    <React.Fragment>
      <g onClick={toggleNode} onMouseEnter={() => setID(nodeDatum.id)} onMouseLeave={() => setID(0)}>
        <defs>
          <clipPath id="circleView">
            <circle cx="1" cy="1" r="50" />
          </clipPath>
        </defs>

        <circle r={51} fill={"transparent"} stroke={bgcolor}></circle>

        <image href={`${process.env.PUBLIC_URL}/img/${nodeDatum.image}`} x={-50} y={-50} height={100} width={100} clipPath="url(#circleView)" />

        <g className="rd3t-label">
          <text className="rd3t-label__title" {...textLayout[orientation].ititle}>
            {nodeDatum.name}
          </text>
        </g>
      </g>
      {tipView(curID, orientation, nodeDatum)}
    </React.Fragment>
  );
}

const unknowPartner = (nodeDatum, orientation, toggleNode, setID, curID, bgcolor) => {
  if (nodeDatum.image) {
    return imageNode(nodeDatum, orientation, toggleNode, setID, curID, bgcolor)
  }
  return nameNode(nodeDatum, orientation, toggleNode, setID, curID, bgcolor)
};

const PureSvgNodeElement = ({ nodeDatum, orientation, toggleNode, setID, curID}) => {
  let bgcolor = "#6A9956";
  if (nodeDatum.death) {
    bgcolor = "#8B8B8B";
  }
  if (!nodeDatum.partner) {
    return unknowPartner(nodeDatum, orientation, toggleNode, setID, curID, bgcolor)
  }
  return unknowPartner(nodeDatum, orientation, toggleNode, setID, curID, bgcolor)
};

export default PureSvgNodeElement;
