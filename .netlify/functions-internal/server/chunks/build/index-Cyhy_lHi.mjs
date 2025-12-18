import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center" }, _attrs))}><div class="prose mb-12"><h1 class="text-1xl"><span class="font-medium">Course: </span><span class="font-bold">Mastering Nuxt</span></h1></div><div class="flex flex-row justify-center flex-grow"><div class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col"><h3>Chapters</h3></div><div class="prose p-12 bg-red-100 rounded-md w-[65ch]"><h2>Lesson</h2><p>This is a lesson</p></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-Cyhy_lHi.mjs.map
