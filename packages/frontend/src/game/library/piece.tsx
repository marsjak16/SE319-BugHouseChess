import React, { Component } from "react";

export class Piece extends Component {
    protected player: number;

    constructor(props: any, player: number) {
        super(props);
        this.player = player;
    }
}


