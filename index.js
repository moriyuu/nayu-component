import { html, render } from "https://unpkg.com/lit-html?module";

const defaultBasefontsize = 120;
const getLineWidth = basesize => basesize * 5.5;

export default class NayuComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    render(this.template, this.shadowRoot);
  }

  get template() {
    const basesize =
      (this.getAttribute("basefontsize")
        ? parseFloat(this.getAttribute("basefontsize"))
        : defaultBasefontsize) / 120;
    const lineWidth = getLineWidth(basesize);

    return html`
      <div class="w">
        <div class="inner">
          <seven-seg
            basesize="${basesize}"
            segs="bc,ef,i"
            margin="0 ${basesize * 18.25}px 0 0"
          ></seven-seg>
          <seven-seg basesize="${basesize}" segs="bc,ef,a,g"></seven-seg>
          <seven-seg basesize="${basesize}" segs="b,f,g,h"></seven-seg>
          <seven-seg basesize="${basesize}" segs="bc,ef,d"></seven-seg>
          <seven-seg basesize="${basesize}" segs="ef,a,d"></seven-seg>
          <seven-seg basesize="${basesize}" segs="bc,ef,a,d"></seven-seg>
          <seven-seg basesize="${basesize}" segs="ef,d"></seven-seg>
          <seven-seg basesize="${basesize}" segs="bc,ef,a,d"></seven-seg>
          <seven-seg basesize="${basesize}" segs="bc,ef,i"></seven-seg>
          <seven-seg
            basesize="${basesize}"
            segs="bc,d,f,g"
            margin="0 0 0 ${basesize * 18.25}px"
          ></seven-seg>
          <div class="horizon">
            <div class="upper"></div>
            <div class="middle"></div>
            <div class="lower"></div>
          </div>
        </div>
      </div>

      <style>
        .w {
          padding: ${basesize * 40}px;
          display: inline-block;
          background-color: #fff;
        }
        .inner {
          position: relative;
          display: inline-flex;
        }
        .horizon {
          position: absolute;
          left: ${basesize * 65}px;
          top: calc(50% - (${lineWidth / 2}px + ${basesize * 4}px));
          height: calc(${basesize * 4}px + ${lineWidth}px + ${basesize * 4}px);
          width: ${basesize * 520}px;
        }
        .horizon > .upper {
          position: absolute;
          top: 0;
          height: ${basesize * 4}px;
          width: ${basesize * 520}px;
          background-color: #fff;
        }
        .horizon > .middle {
          position: absolute;
          top: ${basesize * 4}px;
          height: ${lineWidth}px;
          width: ${basesize * 520}px;
          border-radius: ${lineWidth / 2}px;
          background-color: #000;
        }
        .horizon > .lower {
          position: absolute;
          bottom: 0;
          height: ${basesize * 4}px;
          width: ${basesize * 520}px;
          background-color: #fff;
        }
        .horizon::before {
          content: "";
          position: absolute;
          left: ${basesize * 0.875}px;
          bottom: ${lineWidth}px;
          width: ${lineWidth}px;
          height: ${basesize * 54}px;
          background-color: #000;
          border-radius: ${lineWidth / 2}px;
          transform: rotate(-26.3deg);
          transform-origin: right bottom;
          z-index: 2;
        }
        .horizon::after {
          content: "";
          position: absolute;
          right: ${basesize * 0.925}px;
          bottom: ${lineWidth}px;
          width: ${lineWidth}px;
          height: ${basesize * 54.2}px;
          background-color: #000;
          border-radius: ${lineWidth / 2}px;
          transform: rotate(26.8deg);
          transform-origin: left bottom;
          z-index: 2;
        }
      </style>
    `;
  }
}

class SevenSeg extends HTMLElement {
  static get observedAttributes() {
    return ["basesize", "margin"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    render(this.template, this.shadowRoot);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "segs" || name === "margin" || name === "basesize") {
      render(this.template, this.shadowRoot);
    }
  }

  get template() {
    const segs = this.getAttribute("segs")
      ? this.getAttribute("segs").split(",")
      : [];
    const margin = this.getAttribute("margin");
    const basesize = this.getAttribute("basesize")
      ? parseFloat(this.getAttribute("basesize"))
      : defaultBasefontsize / 4;
    const lineWidth = getLineWidth(basesize);

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
          height: ${basesize * 92.5}px;
          width: ${basesize * 49}px;
          margin: ${margin ? margin : `0 ${basesize * 7.75}px`};
        }
        .w > div {
          position: absolute;
          background-color: #000;
          border-radius: ${lineWidth / 2}px;
        }

        .a,
        .d,
        .g {
          height: ${lineWidth}px;
          width: ${basesize * 49}px;
        }
        .b,
        .c,
        .e,
        .f,
        .h {
          height: calc(${basesize * 92.5}px / 2);
          width: ${lineWidth}px;
        }
        .bc,
        .ef {
          height: ${basesize * 92.5}px;
          width: ${lineWidth}px;
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
          top: calc(50% - ${lineWidth}px);
        }
        .h {
          display: ${segs.includes("h") ? "block" : "none"};
          left: calc(50% - ${lineWidth}px);
          bottom: 0;
        }
        .i {
          display: ${segs.includes("i") ? "block" : "none"};
          height: ${basesize * 102.625}px;
          width: ${lineWidth}px;
          transform: rotate(-26.45deg);
          transform-origin: left top;
          left: ${basesize * -0.75}px;
          top: ${basesize * 1.5}px;
        }
      </style>
    `;
  }
}
window.customElements.define("seven-seg", SevenSeg);
