import React, { memo } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Lazy_Load_Img from "../../custom_hook/Lazy_Load_Img";
const TransformWrappers = ({ url_image }) => {
  console.log(url_image);
  return (
    <React.Fragment>
      <div className="col-md-6">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={7}
          initialPositionX={200}
          initialPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="single-image">
                <TransformComponent>
                  <Lazy_Load_Img url={url_image} />
                </TransformComponent>
              </div>
              <br />
              <button className="btn btn-success" onClick={() => zoomIn()}>
                Zoom In +
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-success" onClick={() => zoomOut()}>
                Zoom Out -
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-danger"
                onClick={() => resetTransform()}
              >
                Return-X
              </button>
              <br />
              <br />
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </React.Fragment>
  );
};

export default memo(TransformWrappers);
