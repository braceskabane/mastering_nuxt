import { _ as __nuxt_component_0 } from './nuxt-link-C8NEaOoV.mjs';
import { a as __nuxt_component_1 } from './server.mjs';
import { mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCourse } from './useCourse-eTrjzUWc.mjs';
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

const _sfc_main = {
  __name: "course",
  __ssrInlineRender: true,
  setup(__props) {
    const { chapters } = useCourse();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center" }, _attrs))}><div class="prose mb-12"><h1 class="text-5xl"><span class="font-medium">Course: </span><span class="font-bold">Mastering Nuxt</span></h1></div><div class="flex flex-row justify-center flex-grow"><div class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col"><h3 class="font-bold">Chapters</h3><!--[-->`);
      ssrRenderList(unref(chapters), (chapter) => {
        _push(`<div class="space-y-1 mb-4 flex flex-col"><h4>${ssrInterpolate(chapter.title)}</h4><!--[-->`);
        ssrRenderList(chapter.lessons, (lesson, index) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: lesson.slug,
            to: lesson.path,
            class: [{
              "text-blue-500": lesson.path === _ctx.$route.path,
              "text-gray-500": lesson.path !== _ctx.$route.path
            }, "flex flex-row space-x-1 no-underline prose-sm font-normal"]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>${ssrInterpolate(index + 1)}. </span><span${_scopeId}>${ssrInterpolate(lesson.title)}</span>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(index + 1) + ". ", 1),
                  createVNode("span", null, toDisplayString(lesson.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div><div class="prose p-12 bg-red-100 rounded-md w-[65ch]">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/course.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=course-2q1zQap0.mjs.map
