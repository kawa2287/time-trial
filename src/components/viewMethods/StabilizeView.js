'use strict';

export default function StabilizeView (e){
    var mousePointTo = {
            x: e.target.getStage().getPointerPosition().x - e.target.getStage().x(),
            y: e.target.getStage().getPointerPosition().y - e.target.getStage().y(),
        };
    return {
            x: -(mousePointTo.x - e.target.getStage().getPointerPosition().x),
            y: -(mousePointTo.y - e.target.getStage().getPointerPosition().y)
        };
}