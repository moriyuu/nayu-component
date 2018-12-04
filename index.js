import { html, render } from "./node_modules/lit-html/lit-html.js";

export class SevenSeg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    render(this.template, this.shadowRoot);
  }

  get template() {
    const segs = this.getAttribute("segs")
      ? this.getAttribute("segs").split(",")
      : [];
    const margin = this.getAttribute("margin");

    return html`
      <div class="w">
        <div class="a"></div>
        <div class="b"></div>
        <div class="c"></div>
        <div class="bc"></div>
        <div class="d"></div>
        <div class="e"></div>
        <div class="f"></div>
        <div class="ef"></div>
        <div class="g"></div>
        <div class="h"></div>
        <div class="i"></div>
      </div>

      <style>
        * {
          box-sizing: border-box;
        }
        .w {
          position: relative;
          height: 370px;
          width: 196px;
          margin: ${margin ? margin : "0 31px"};
        }
        .w > div {
          position: absolute;
          background-color: #000;
          border-radius: 11px;
        }

        .a,
        .d,
        .g {
          height: 22px;
          width: 196px;
        }
        .b,
        .c,
        .e,
        .f,
        .h {
          height: calc(370px / 2);
          width: 22px;
        }
        .bc,
        .ef {
          height: 370px;
          width: 22px;
        }

        .a {
          display: ${segs.includes("a") ? "block" : "none"};
          top: 0;
        }
        .b {
          display: ${segs.includes("b") ? "block" : "none"};
          right: 0;
        }
        .c {
          display: ${segs.includes("c") ? "block" : "none"};
          right: 0;
          bottom: 0;
        }
        .bc {
          display: ${segs.includes("bc") ? "block" : "none"};
          right: 0;
        }
        .d {
          display: ${segs.includes("d") ? "block" : "none"};
          bottom: 0;
        }
        .e {
          display: ${segs.includes("e") ? "block" : "none"};
          bottom: 0;
        }
        .f {
          display: ${segs.includes("f") ? "block" : "none"};
          top: 0;
        }
        .ef {
          display: ${segs.includes("ef") ? "block" : "none"};
          left: 0;
        }
        .g {
          display: ${segs.includes("g") ? "block" : "none"};
          top: calc(50% - 11px);
        }
        .h {
          display: ${segs.includes("h") ? "block" : "none"};
          left: calc(50% - 11px);
          bottom: 0;
        }
        .i {
          display: ${segs.includes("i") ? "block" : "none"};
          height: 410.5px;
          width: 22px;
          transform: rotate(-26.45deg);
          transform-origin: left top;
          left: -3px;
          top: 6px;
        }
      </style>
    `;
  }
}
window.customElements.define("seven-seg", SevenSeg);

export class NayucolonyLogo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    render(this.template, this.shadowRoot);
  }

  get template() {
    const basesize =
      (this.getAttribute("basesize")
        ? parseFloat(this.getAttribute("basesize"))
        : 16) / 4;
    console.log("basesize", basesize);

    return html`
      <div class="w">
        <div class="inner">
          <seven-seg segs="bc,ef,i" margin="0 73px 0 0"></seven-seg>
          <seven-seg segs="bc,ef,a,g"></seven-seg>
          <seven-seg segs="b,f,g,h"></seven-seg>
          <seven-seg segs="bc,ef,d"></seven-seg>
          <seven-seg segs="ef,a,d"></seven-seg>
          <seven-seg segs="bc,ef,a,d"></seven-seg>
          <seven-seg segs="ef,d"></seven-seg>
          <seven-seg segs="bc,ef,a,d"></seven-seg>
          <seven-seg segs="bc,ef,i"></seven-seg>
          <seven-seg segs="bc,d,f,g" margin="0 0 0 73px"></seven-seg>
          <div class="horizon">
            <div class="upper"></div>
            <div class="middle"></div>
            <div class="lower"></div>
          </div>
        </div>
      </div>

      <style>
        .w {
          padding: 120px;
          display: inline-block;
          background-color: #fff;
        }
        .inner {
          position: relative;
          display: inline-flex;
        }
        .horizon {
          position: absolute;
          left: 260px;
          top: calc(50% - (11px + 16px));
          height: calc(16px + 22px + 16px);
          width: 2080px;
        }
        .horizon > .upper {
          position: absolute;
          top: 0;
          height: 16px;
          width: 2080px;
          background-color: #fff;
        }
        .horizon > .middle {
          position: absolute;
          top: 16px;
          height: 22px;
          width: 2080px;
          border-radius: 11px;
          background-color: #000;
        }
        .horizon > .lower {
          position: absolute;
          bottom: 0;
          height: 16px;
          width: 2080px;
          background-color: #fff;
        }
        .horizon::before {
          content: "";
          position: absolute;
          left: 3.5px;
          bottom: 22px;
          width: 22px;
          height: 216px;
          background-color: #000;
          border-radius: 11px;
          transform: rotate(-26.3deg);
          transform-origin: right bottom;
          z-index: 2;
        }
        .horizon::after {
          content: "";
          position: absolute;
          right: 3.7px;
          bottom: 22px;
          width: 22px;
          height: 216.8px;
          background-color: #000;
          border-radius: 11px;
          transform: rotate(26.8deg);
          transform-origin: left bottom;
          z-index: 2;
        }
      </style>
    `;
  }
}
