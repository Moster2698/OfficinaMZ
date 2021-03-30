import React from "react";
import "../../Styles/Mappa.css";
function Mappa() {
  return (
    <div>
      <div class="grid-wrapper">
        <div class="grid">
          <div class="grid-item">
            <div id="title">1</div>
          </div>
          <div class="grid-item">
            <div id="title">7</div>
          </div>
          <div class="grid-item" id="hidden"></div>
          <div class="grid-item">
            <div id="title">2</div>
          </div>
          <div class="grid-item" id="hidden"></div>
          <div class="grid-item" id="hidden"></div>
          <div class="grid-item-busy">
            <div id="title">6</div>
          </div>
          <div class="grid-item-busy">
            <div id="title">7</div>
          </div>
          <div class="grid-item" id="hidden"></div>
          <div class="grid-item" id="hidden"></div>
          <div class="grid-item">
            <div id="title">12</div>
          </div>
          <div class="grid-item">
            <div id="title">2</div>
          </div>
          <div class="grid-item">
            <div id="title">2</div>
          </div>
          <div class="grid-item">
            <div id="title">2</div>
          </div>
          <div class="grid-item">
            <div id="title">2</div>
          </div>
          <div class="grid-item">
            <div id="title">2</div>
          </div>
          <div class="grid-item" id="hidden"></div>
          <div class="grid-item-busy">
            <div id="title">7</div>
          </div>
        </div>
      </div>
      <div class="key">
        <div id="dot-free"></div>
        <div id="description"> Libero</div>
        <div id="dot-busy"></div>
        <div id="description"> Occupato</div>
      </div>
    </div>
  );
}
export default Mappa;
