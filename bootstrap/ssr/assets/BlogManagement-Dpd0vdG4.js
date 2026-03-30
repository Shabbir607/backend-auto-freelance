import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, ag as composeRefs, ah as useCallbackRef, ai as useDirection, a0 as createContextScope, O as Presence, aj as Portal$1, W as useComposedRefs, Y as composeEventHandlers, ak as hideOthers, Q as Primitive, al as dispatchDiscreteCustomEvent, am as useFocusGuards, an as ReactRemoveScroll, ao as FocusScope, ap as DismissableLayer, T as useControllableState, aq as useId, c as cn, ar as ChevronRightIcon, a1 as CheckIcon, as as DotFilledIcon, a as useToast, L as LoaderCircle, n as BookOpen, b as Button, at as Plus, a5 as CircleCheckBig, E as Eye, h as Card, q as Search, I as Input, au as Calendar, av as formatDistanceToNow, g as Badge, aw as Dialog, ax as DialogContent, ay as DialogHeader, az as DialogTitle, aA as DialogDescription, aB as DialogFooter, ae as adminBlogService, aC as adminBlogCategoryService, k as Clock } from "../ssr.js";
import { c as createCollection } from "./index-sGgg5_n-.js";
import { R as Root2$1, A as Anchor, c as createPopperScope, C as Content, a as Arrow, S as Select, b as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem } from "./select-D43oyr7W.js";
import { c as createRovingFocusGroupScope, I as Item, R as Root } from "./index-FqzpclsW.js";
import { L as Label$1 } from "./label-CAj1YcMb.js";
import { T as Textarea } from "./textarea-DZtg9ezc.js";
import { R as RefreshCw } from "./refresh-cw-Bi_GhDfH.js";
import { S as SquarePen } from "./square-pen-Cs9H9Kwc.js";
import { T as Trash2 } from "./trash-2-Cu4B9ujU.js";
import "stream";
import "util";
const EllipsisVertical = createLucideIcon("EllipsisVertical", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
]);
const FolderPlus = createLucideIcon("FolderPlus", [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
]);
const Tag = createLucideIcon("Tag", [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
]);
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
var LAST_KEYS = ["ArrowUp", "PageDown", "End"];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, "ArrowRight"],
  rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
};
var MENU_NAME = "Menu";
var [Collection, useCollection, createCollectionScope] = createCollection(MENU_NAME);
var [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
  createCollectionScope,
  createPopperScope,
  createRovingFocusGroupScope
]);
var usePopperScope = createPopperScope();
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
var Menu = (props) => {
  const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
  const popperScope = usePopperScope(__scopeMenu);
  const [content, setContent] = reactExports.useState(null);
  const isUsingKeyboardRef = reactExports.useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);
  const direction = useDirection(dir);
  reactExports.useEffect(() => {
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      document.addEventListener("pointerdown", handlePointer, { capture: true, once: true });
      document.addEventListener("pointermove", handlePointer, { capture: true, once: true });
    };
    const handlePointer = () => isUsingKeyboardRef.current = false;
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("pointerdown", handlePointer, { capture: true });
      document.removeEventListener("pointermove", handlePointer, { capture: true });
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuProvider,
    {
      scope: __scopeMenu,
      open,
      onOpenChange: handleOpenChange,
      content,
      onContentChange: setContent,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuRootProvider,
        {
          scope: __scopeMenu,
          onClose: reactExports.useCallback(() => handleOpenChange(false), [handleOpenChange]),
          isUsingKeyboardRef,
          dir: direction,
          modal,
          children
        }
      )
    }
  ) });
};
Menu.displayName = MENU_NAME;
var ANCHOR_NAME = "MenuAnchor";
var MenuAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...anchorProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }
);
MenuAnchor.displayName = ANCHOR_NAME;
var PORTAL_NAME$1 = "MenuPortal";
var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME$1, {
  forceMount: void 0
});
var MenuPortal = (props) => {
  const { __scopeMenu, forceMount, children, container } = props;
  const context = useMenuContext(PORTAL_NAME$1, __scopeMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeMenu, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
MenuPortal.displayName = PORTAL_NAME$1;
var CONTENT_NAME$1 = "MenuContent";
var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME$1);
var MenuContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeMenu, children: rootContext.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRootContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRootContentNonModal, { ...contentProps, ref: forwardedRef }) }) }) });
  }
);
var MenuRootContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    reactExports.useEffect(() => {
      const content = ref.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: context.open,
        disableOutsideScroll: true,
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        ),
        onDismiss: () => context.onOpenChange(false)
      }
    );
  }
);
var MenuRootContentNonModal = reactExports.forwardRef((props, forwardedRef) => {
  const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuContentImpl,
    {
      ...props,
      ref: forwardedRef,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      disableOutsideScroll: false,
      onDismiss: () => context.onOpenChange(false)
    }
  );
});
var Slot = /* @__PURE__ */ createSlot("MenuContent.ScrollLock");
var MenuContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeMenu,
      loop = false,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEntryFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      disableOutsideScroll,
      ...contentProps
    } = props;
    const context = useMenuContext(CONTENT_NAME$1, __scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, __scopeMenu);
    const popperScope = usePopperScope(__scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const getItems = useCollection(__scopeMenu);
    const [currentItemId, setCurrentItemId] = reactExports.useState(null);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
    const timerRef = reactExports.useRef(0);
    const searchRef = reactExports.useRef("");
    const pointerGraceTimerRef = reactExports.useRef(0);
    const pointerGraceIntentRef = reactExports.useRef(null);
    const pointerDirRef = reactExports.useRef("right");
    const lastPointerXRef = reactExports.useRef(0);
    const ScrollLockWrapper = disableOutsideScroll ? ReactRemoveScroll : reactExports.Fragment;
    const scrollLockWrapperProps = disableOutsideScroll ? { as: Slot, allowPinchZoom: true } : void 0;
    const handleTypeaheadSearch = (key) => {
      const search = searchRef.current + key;
      const items = getItems().filter((item) => !item.disabled);
      const currentItem = document.activeElement;
      const currentMatch = items.find((item) => item.ref.current === currentItem)?.textValue;
      const values = items.map((item) => item.textValue);
      const nextMatch = getNextMatch(values, search, currentMatch);
      const newItem = items.find((item) => item.textValue === nextMatch)?.ref.current;
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
      if (newItem) {
        setTimeout(() => newItem.focus());
      }
    };
    reactExports.useEffect(() => {
      return () => window.clearTimeout(timerRef.current);
    }, []);
    useFocusGuards();
    const isPointerMovingToSubmenu = reactExports.useCallback((event) => {
      const isMovingTowards = pointerDirRef.current === pointerGraceIntentRef.current?.side;
      return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuContentProvider,
      {
        scope: __scopeMenu,
        searchRef,
        onItemEnter: reactExports.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
          },
          [isPointerMovingToSubmenu]
        ),
        onItemLeave: reactExports.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) return;
            contentRef.current?.focus();
            setCurrentItemId(null);
          },
          [isPointerMovingToSubmenu]
        ),
        onTriggerLeave: reactExports.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
          },
          [isPointerMovingToSubmenu]
        ),
        pointerGraceTimerRef,
        onPointerGraceIntentChange: reactExports.useCallback((intent) => {
          pointerGraceIntentRef.current = intent;
        }, []),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollLockWrapper, { ...scrollLockWrapperProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FocusScope,
          {
            asChild: true,
            trapped: trapFocus,
            onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
              event.preventDefault();
              contentRef.current?.focus({ preventScroll: true });
            }),
            onUnmountAutoFocus: onCloseAutoFocus,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DismissableLayer,
              {
                asChild: true,
                disableOutsidePointerEvents,
                onEscapeKeyDown,
                onPointerDownOutside,
                onFocusOutside,
                onInteractOutside,
                onDismiss,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Root,
                  {
                    asChild: true,
                    ...rovingFocusGroupScope,
                    dir: rootContext.dir,
                    orientation: "vertical",
                    loop,
                    currentTabStopId: currentItemId,
                    onCurrentTabStopIdChange: setCurrentItemId,
                    onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
                      if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
                    }),
                    preventScrollOnEntryFocus: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Content,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": getOpenState(context.open),
                        "data-radix-menu-content": "",
                        dir: rootContext.dir,
                        ...popperScope,
                        ...contentProps,
                        ref: composedRefs,
                        style: { outline: "none", ...contentProps.style },
                        onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                          const target = event.target;
                          const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
                          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                          const isCharacterKey = event.key.length === 1;
                          if (isKeyDownInside) {
                            if (event.key === "Tab") event.preventDefault();
                            if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
                          }
                          const content = contentRef.current;
                          if (event.target !== content) return;
                          if (!FIRST_LAST_KEYS.includes(event.key)) return;
                          event.preventDefault();
                          const items = getItems().filter((item) => !item.disabled);
                          const candidateNodes = items.map((item) => item.ref.current);
                          if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                          focusFirst(candidateNodes);
                        }),
                        onBlur: composeEventHandlers(props.onBlur, (event) => {
                          if (!event.currentTarget.contains(event.target)) {
                            window.clearTimeout(timerRef.current);
                            searchRef.current = "";
                          }
                        }),
                        onPointerMove: composeEventHandlers(
                          props.onPointerMove,
                          whenMouse((event) => {
                            const target = event.target;
                            const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
                            if (event.currentTarget.contains(target) && pointerXHasChanged) {
                              const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
                              pointerDirRef.current = newDir;
                              lastPointerXRef.current = event.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
MenuContent.displayName = CONTENT_NAME$1;
var GROUP_NAME$1 = "MenuGroup";
var MenuGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...groupProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { role: "group", ...groupProps, ref: forwardedRef });
  }
);
MenuGroup.displayName = GROUP_NAME$1;
var LABEL_NAME$1 = "MenuLabel";
var MenuLabel = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...labelProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...labelProps, ref: forwardedRef });
  }
);
MenuLabel.displayName = LABEL_NAME$1;
var ITEM_NAME$1 = "MenuItem";
var ITEM_SELECT = "menu.itemSelect";
var MenuItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { disabled = false, onSelect, ...itemProps } = props;
    const ref = reactExports.useRef(null);
    const rootContext = useMenuRootContext(ITEM_NAME$1, props.__scopeMenu);
    const contentContext = useMenuContentContext(ITEM_NAME$1, props.__scopeMenu);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const isPointerDownRef = reactExports.useRef(false);
    const handleSelect = () => {
      const menuItem = ref.current;
      if (!disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true });
        menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
        dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
        if (itemSelectEvent.defaultPrevented) {
          isPointerDownRef.current = false;
        } else {
          rootContext.onClose();
        }
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItemImpl,
      {
        ...itemProps,
        ref: composedRefs,
        disabled,
        onClick: composeEventHandlers(props.onClick, handleSelect),
        onPointerDown: (event) => {
          props.onPointerDown?.(event);
          isPointerDownRef.current = true;
        },
        onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
          if (!isPointerDownRef.current) event.currentTarget?.click();
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          const isTypingAhead = contentContext.searchRef.current !== "";
          if (disabled || isTypingAhead && event.key === " ") return;
          if (SELECTION_KEYS.includes(event.key)) {
            event.currentTarget.click();
            event.preventDefault();
          }
        })
      }
    );
  }
);
MenuItem.displayName = ITEM_NAME$1;
var MenuItemImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
    const contentContext = useMenuContentContext(ITEM_NAME$1, __scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const [isFocused, setIsFocused] = reactExports.useState(false);
    const [textContent, setTextContent] = reactExports.useState("");
    reactExports.useEffect(() => {
      const menuItem = ref.current;
      if (menuItem) {
        setTextContent((menuItem.textContent ?? "").trim());
      }
    }, [itemProps.children]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeMenu,
        disabled,
        textValue: textValue ?? textContent,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { asChild: true, ...rovingFocusGroupScope, focusable: !disabled, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "menuitem",
            "data-highlighted": isFocused ? "" : void 0,
            "aria-disabled": disabled || void 0,
            "data-disabled": disabled ? "" : void 0,
            ...itemProps,
            ref: composedRefs,
            onPointerMove: composeEventHandlers(
              props.onPointerMove,
              whenMouse((event) => {
                if (disabled) {
                  contentContext.onItemLeave(event);
                } else {
                  contentContext.onItemEnter(event);
                  if (!event.defaultPrevented) {
                    const item = event.currentTarget;
                    item.focus({ preventScroll: true });
                  }
                }
              })
            ),
            onPointerLeave: composeEventHandlers(
              props.onPointerLeave,
              whenMouse((event) => contentContext.onItemLeave(event))
            ),
            onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
            onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
          }
        ) })
      }
    );
  }
);
var CHECKBOX_ITEM_NAME$1 = "MenuCheckboxItem";
var MenuCheckboxItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem,
      {
        role: "menuitemcheckbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        ...checkboxItemProps,
        ref: forwardedRef,
        "data-state": getCheckedState(checked),
        onSelect: composeEventHandlers(
          checkboxItemProps.onSelect,
          () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME$1;
var RADIO_GROUP_NAME$1 = "MenuRadioGroup";
var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(
  RADIO_GROUP_NAME$1,
  { value: void 0, onValueChange: () => {
  } }
);
var MenuRadioGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { value, onValueChange, ...groupProps } = props;
    const handleValueChange = useCallbackRef(onValueChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupProvider, { scope: props.__scopeMenu, value, onValueChange: handleValueChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroup, { ...groupProps, ref: forwardedRef }) });
  }
);
MenuRadioGroup.displayName = RADIO_GROUP_NAME$1;
var RADIO_ITEM_NAME$1 = "MenuRadioItem";
var MenuRadioItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { value, ...radioItemProps } = props;
    const context = useRadioGroupContext(RADIO_ITEM_NAME$1, props.__scopeMenu);
    const checked = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem,
      {
        role: "menuitemradio",
        "aria-checked": checked,
        ...radioItemProps,
        ref: forwardedRef,
        "data-state": getCheckedState(checked),
        onSelect: composeEventHandlers(
          radioItemProps.onSelect,
          () => context.onValueChange?.(value),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
MenuRadioItem.displayName = RADIO_ITEM_NAME$1;
var ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(
  ITEM_INDICATOR_NAME,
  { checked: false }
);
var MenuItemIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
    const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            ...itemIndicatorProps,
            ref: forwardedRef,
            "data-state": getCheckedState(indicatorContext.checked)
          }
        )
      }
    );
  }
);
MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SEPARATOR_NAME$1 = "MenuSeparator";
var MenuSeparator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...separatorProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...separatorProps,
        ref: forwardedRef
      }
    );
  }
);
MenuSeparator.displayName = SEPARATOR_NAME$1;
var ARROW_NAME$1 = "MenuArrow";
var MenuArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
MenuArrow.displayName = ARROW_NAME$1;
var SUB_NAME = "MenuSub";
var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
var SUB_TRIGGER_NAME$1 = "MenuSubTrigger";
var MenuSubTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useMenuContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const subContext = useMenuSubContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const contentContext = useMenuContentContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const openTimerRef = reactExports.useRef(null);
    const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
    const scope = { __scopeMenu: props.__scopeMenu };
    const clearOpenTimer = reactExports.useCallback(() => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }, []);
    reactExports.useEffect(() => clearOpenTimer, [clearOpenTimer]);
    reactExports.useEffect(() => {
      const pointerGraceTimer = pointerGraceTimerRef.current;
      return () => {
        window.clearTimeout(pointerGraceTimer);
        onPointerGraceIntentChange(null);
      };
    }, [pointerGraceTimerRef, onPointerGraceIntentChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MenuAnchor, { asChild: true, ...scope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItemImpl,
      {
        id: subContext.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": subContext.contentId,
        "data-state": getOpenState(context.open),
        ...props,
        ref: composeRefs(forwardedRef, subContext.onTriggerChange),
        onClick: (event) => {
          props.onClick?.(event);
          if (props.disabled || event.defaultPrevented) return;
          event.currentTarget.focus();
          if (!context.open) context.onOpenChange(true);
        },
        onPointerMove: composeEventHandlers(
          props.onPointerMove,
          whenMouse((event) => {
            contentContext.onItemEnter(event);
            if (event.defaultPrevented) return;
            if (!props.disabled && !context.open && !openTimerRef.current) {
              contentContext.onPointerGraceIntentChange(null);
              openTimerRef.current = window.setTimeout(() => {
                context.onOpenChange(true);
                clearOpenTimer();
              }, 100);
            }
          })
        ),
        onPointerLeave: composeEventHandlers(
          props.onPointerLeave,
          whenMouse((event) => {
            clearOpenTimer();
            const contentRect = context.content?.getBoundingClientRect();
            if (contentRect) {
              const side = context.content?.dataset.side;
              const rightSide = side === "right";
              const bleed = rightSide ? -5 : 5;
              const contentNearEdge = contentRect[rightSide ? "left" : "right"];
              const contentFarEdge = contentRect[rightSide ? "right" : "left"];
              contentContext.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: event.clientX + bleed, y: event.clientY },
                  { x: contentNearEdge, y: contentRect.top },
                  { x: contentFarEdge, y: contentRect.top },
                  { x: contentFarEdge, y: contentRect.bottom },
                  { x: contentNearEdge, y: contentRect.bottom }
                ],
                side
              });
              window.clearTimeout(pointerGraceTimerRef.current);
              pointerGraceTimerRef.current = window.setTimeout(
                () => contentContext.onPointerGraceIntentChange(null),
                300
              );
            } else {
              contentContext.onTriggerLeave(event);
              if (event.defaultPrevented) return;
              contentContext.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          const isTypingAhead = contentContext.searchRef.current !== "";
          if (props.disabled || isTypingAhead && event.key === " ") return;
          if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
            context.onOpenChange(true);
            context.content?.focus();
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
MenuSubTrigger.displayName = SUB_TRIGGER_NAME$1;
var SUB_CONTENT_NAME$1 = "MenuSubContent";
var MenuSubContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...subContentProps } = props;
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
    const subContext = useMenuSubContext(SUB_CONTENT_NAME$1, props.__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuContentImpl,
      {
        id: subContext.contentId,
        "aria-labelledby": subContext.triggerId,
        ...subContentProps,
        ref: composedRefs,
        align: "start",
        side: rootContext.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: false,
        disableOutsideScroll: false,
        trapFocus: false,
        onOpenAutoFocus: (event) => {
          if (rootContext.isUsingKeyboardRef.current) ref.current?.focus();
          event.preventDefault();
        },
        onCloseAutoFocus: (event) => event.preventDefault(),
        onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
          if (event.target !== subContext.trigger) context.onOpenChange(false);
        }),
        onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
          rootContext.onClose();
          event.preventDefault();
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          const isKeyDownInside = event.currentTarget.contains(event.target);
          const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
          if (isKeyDownInside && isCloseKey) {
            context.onOpenChange(false);
            subContext.trigger?.focus();
            event.preventDefault();
          }
        })
      }
    ) }) }) });
  }
);
MenuSubContent.displayName = SUB_CONTENT_NAME$1;
function getOpenState(open) {
  return open ? "open" : "closed";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getCheckedState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find(
    (value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function isPointerInGraceArea(event, area) {
  if (!area) return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}
function whenMouse(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var Root3 = Menu;
var Anchor2 = MenuAnchor;
var Portal = MenuPortal;
var Content2$1 = MenuContent;
var Group = MenuGroup;
var Label = MenuLabel;
var Item2$1 = MenuItem;
var CheckboxItem = MenuCheckboxItem;
var RadioGroup = MenuRadioGroup;
var RadioItem = MenuRadioItem;
var ItemIndicator = MenuItemIndicator;
var Separator = MenuSeparator;
var Arrow2 = MenuArrow;
var SubTrigger = MenuSubTrigger;
var SubContent = MenuSubContent;
var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext] = createContextScope(
  DROPDOWN_MENU_NAME,
  [createMenuScope]
);
var useMenuScope = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu$1 = (props) => {
  const {
    __scopeDropdownMenu,
    children,
    dir,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  const triggerRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DROPDOWN_MENU_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DropdownMenuProvider,
    {
      scope: __scopeDropdownMenu,
      triggerId: useId(),
      triggerRef,
      contentId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root3, { ...menuScope, open, onOpenChange: setOpen, dir, modal, children })
    }
  );
};
DropdownMenu$1.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME = "DropdownMenuTrigger";
var DropdownMenuTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
    const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor2, { asChild: true, ...menuScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        id: context.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.contentId : void 0,
        "data-state": context.open ? "open" : "closed",
        "data-disabled": disabled ? "" : void 0,
        disabled,
        ...triggerProps,
        ref: composeRefs(forwardedRef, context.triggerRef),
        onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
          if (!disabled && event.button === 0 && event.ctrlKey === false) {
            context.onOpenToggle();
            if (!context.open) event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          if (disabled) return;
          if (["Enter", " "].includes(event.key)) context.onOpenToggle();
          if (event.key === "ArrowDown") context.onOpenChange(true);
          if (["Enter", " ", "ArrowDown"].includes(event.key)) event.preventDefault();
        })
      }
    ) });
  }
);
DropdownMenuTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DropdownMenuPortal";
var DropdownMenuPortal = (props) => {
  const { __scopeDropdownMenu, ...portalProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...menuScope, ...portalProps });
};
DropdownMenuPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "DropdownMenuContent";
var DropdownMenuContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...contentProps } = props;
    const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2$1,
      {
        id: context.contentId,
        "aria-labelledby": context.triggerId,
        ...menuScope,
        ...contentProps,
        ref: forwardedRef,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
          hasInteractedOutsideRef.current = false;
          event.preventDefault();
        }),
        onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
        }),
        style: {
          ...props.style,
          // re-namespace exposed content custom properties
          ...{
            "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
            "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
            "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
          }
        }
      }
    );
  }
);
DropdownMenuContent$1.displayName = CONTENT_NAME;
var GROUP_NAME = "DropdownMenuGroup";
var DropdownMenuGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...groupProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { ...menuScope, ...groupProps, ref: forwardedRef });
  }
);
DropdownMenuGroup.displayName = GROUP_NAME;
var LABEL_NAME = "DropdownMenuLabel";
var DropdownMenuLabel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...labelProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { ...menuScope, ...labelProps, ref: forwardedRef });
  }
);
DropdownMenuLabel$1.displayName = LABEL_NAME;
var ITEM_NAME = "DropdownMenuItem";
var DropdownMenuItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...itemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Item2$1, { ...menuScope, ...itemProps, ref: forwardedRef });
  }
);
DropdownMenuItem$1.displayName = ITEM_NAME;
var CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...checkboxItemProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxItem, { ...menuScope, ...checkboxItemProps, ref: forwardedRef });
});
DropdownMenuCheckboxItem$1.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioGroupProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { ...menuScope, ...radioGroupProps, ref: forwardedRef });
});
DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "DropdownMenuRadioItem";
var DropdownMenuRadioItem$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioItemProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioItem, { ...menuScope, ...radioItemProps, ref: forwardedRef });
});
DropdownMenuRadioItem$1.displayName = RADIO_ITEM_NAME;
var INDICATOR_NAME = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { ...menuScope, ...itemIndicatorProps, ref: forwardedRef });
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME = "DropdownMenuSeparator";
var DropdownMenuSeparator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...separatorProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { ...menuScope, ...separatorProps, ref: forwardedRef });
});
DropdownMenuSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "DropdownMenuArrow";
var DropdownMenuArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...arrowProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow2, { ...menuScope, ...arrowProps, ref: forwardedRef });
  }
);
DropdownMenuArrow.displayName = ARROW_NAME;
var SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subTriggerProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SubTrigger, { ...menuScope, ...subTriggerProps, ref: forwardedRef });
});
DropdownMenuSubTrigger$1.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "DropdownMenuSubContent";
var DropdownMenuSubContent$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subContentProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SubContent,
    {
      ...menuScope,
      ...subContentProps,
      ref: forwardedRef,
      style: {
        ...props.style,
        // re-namespace exposed content custom properties
        ...{
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    }
  );
});
DropdownMenuSubContent$1.displayName = SUB_CONTENT_NAME;
var Root2 = DropdownMenu$1;
var Trigger = DropdownMenuTrigger$1;
var Portal2 = DropdownMenuPortal;
var Content2 = DropdownMenuContent$1;
var Label2 = DropdownMenuLabel$1;
var Item2 = DropdownMenuItem$1;
var CheckboxItem2 = DropdownMenuCheckboxItem$1;
var RadioItem2 = DropdownMenuRadioItem$1;
var ItemIndicator2 = DropdownMenuItemIndicator;
var Separator2 = DropdownMenuSeparator$1;
var SubTrigger2 = DropdownMenuSubTrigger$1;
var SubContent2 = DropdownMenuSubContent$1;
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DotFilledIcon, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function BlogManagement() {
  const { showToast } = useToast();
  const [blogs, setBlogs] = reactExports.useState([]);
  const [blogCategories, setBlogCategories] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("All");
  const [selectedStatus, setSelectedStatus] = reactExports.useState("all");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isFetchingDetails, setIsFetchingDetails] = reactExports.useState(false);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [totalBlogs, setTotalBlogs] = reactExports.useState(0);
  const [showBlogDialog, setShowBlogDialog] = reactExports.useState(false);
  const [editingBlog, setEditingBlog] = reactExports.useState(null);
  const [blogForm, setBlogForm] = reactExports.useState({
    category_id: 0,
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    status: "draft",
    is_featured: false,
    published_at: "",
    // Advanced SEO fields
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_canonical: "",
    seo_og_image: "",
    seo_twitter_card: "",
    seo_twitter_site: ""
  });
  const [isSavingBlog, setIsSavingBlog] = reactExports.useState(false);
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState("");
  const [showCategoryDialog, setShowCategoryDialog] = reactExports.useState(false);
  const [categoryForm, setCategoryForm] = reactExports.useState({
    title: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    sort_order: 1,
    is_active: true
  });
  const [isSavingCategory, setIsSavingCategory] = reactExports.useState(false);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [viewingBlog, setViewingBlog] = reactExports.useState(null);
  const fetchBlogs = async (page = 1) => {
    setIsLoading(true);
    try {
      const result = await adminBlogService.getAll(page, 20);
      if (result.success && result.data) {
        setBlogs(result.data.data);
        setCurrentPage(result.data.current_page);
        setTotalPages(result.data.last_page);
        setTotalBlogs(result.data.total);
      } else {
        showToast(result.message || "Failed to fetch blogs", "error");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showToast("An error occurred while fetching blogs", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      const result = await adminBlogCategoryService.getAll();
      if (result.success && result.data && result.data.data) {
        setBlogCategories(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  reactExports.useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const categoryId = selectedCategory !== "All" ? blogCategories.find((c) => c.title === selectedCategory)?.id : void 0;
      const result = await adminBlogService.search(searchQuery, {
        category_id: categoryId,
        status: selectedStatus,
        page: 1
      });
      if (result.success && result.data) {
        setBlogs(result.data.data);
        setCurrentPage(result.data.current_page);
        setTotalPages(result.data.last_page);
        setTotalBlogs(result.data.total);
      } else {
        showToast(result.message || "Search failed", "error");
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
      showToast("An error occurred while searching", "error");
    } finally {
      setIsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery || selectedCategory !== "All" || selectedStatus !== "all") {
        handleSearch();
      } else {
        fetchBlogs(1);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedCategory, selectedStatus]);
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const result = await adminBlogService.delete(id);
      if (result.success) {
        setBlogs(blogs.filter((b) => b.id !== id));
        showToast("Blog post deleted successfully", "success");
      } else {
        showToast(result.message || "Failed to delete blog post", "error");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      showToast("An error occurred while deleting", "error");
    }
  };
  const handleCreateBlog = () => {
    setEditingBlog(null);
    setImageFile(null);
    setImagePreview("");
    setBlogForm({
      category_id: blogCategories.length > 0 ? blogCategories[0].id : 0,
      title: "",
      slug: "",
      description: "",
      content: "",
      image_url: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      status: "draft",
      is_featured: false,
      published_at: "",
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      seo_canonical: "",
      seo_og_image: "",
      seo_twitter_card: "",
      seo_twitter_site: ""
    });
    setShowBlogDialog(true);
  };
  const handleEditBlog = async (blog) => {
    setIsFetchingDetails(true);
    try {
      const baseUrl = "http://localhost:8000/api";
      const fetchUrl = baseUrl ? `${baseUrl}/blogs/${blog.slug || blog.id}` : `/api/blogs/${blog.slug || blog.id}`;
      const response = await fetch(fetchUrl, {
        headers: {
          "x-app-key": "739f77912fa0ca22538ad067e284545d5cd541a7c13cacebb5e3e4a8fdec9c8"
        }
      });
      const result = await response.json();
      const fullBlogData = result.success ? result.data : blog;
      const seoData = result.success ? result.seo : null;
      setEditingBlog(fullBlogData);
      setImageFile(null);
      setImagePreview("");
      setBlogForm({
        category_id: fullBlogData.category_id || 0,
        title: fullBlogData.title || "",
        slug: fullBlogData.slug || "",
        description: fullBlogData.description || "",
        content: fullBlogData.content || "",
        image_url: fullBlogData.image_url || "",
        meta_title: fullBlogData.meta_title || "",
        meta_description: fullBlogData.meta_description || "",
        meta_keywords: fullBlogData.meta_keywords || "",
        status: fullBlogData.status || "draft",
        is_featured: fullBlogData.is_featured || false,
        published_at: fullBlogData.published_at ? fullBlogData.published_at.slice(0, 16) : "",
        seo_title: seoData?.title || "",
        seo_description: seoData?.description || "",
        seo_keywords: seoData?.keywords || "",
        seo_canonical: seoData?.canonical || "",
        seo_og_image: seoData?.og_image || "",
        seo_twitter_card: seoData?.twitter_card || "",
        seo_twitter_site: seoData?.twitter_site || ""
      });
      setShowBlogDialog(true);
    } catch (error) {
      console.error("Error fetching full blog details:", error);
      showToast("Failed to fetch full blog details. Loading partial data.", "error");
      setEditingBlog(blog);
      setImageFile(null);
      setImagePreview("");
      setBlogForm({
        category_id: blog.category_id,
        title: blog.title,
        slug: blog.slug || "",
        description: blog.description,
        content: blog.content,
        image_url: blog.image_url || "",
        meta_title: blog.meta_title,
        meta_description: blog.meta_description,
        meta_keywords: blog.meta_keywords,
        status: blog.status,
        is_featured: blog.is_featured,
        published_at: "",
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        seo_canonical: "",
        seo_og_image: "",
        seo_twitter_card: "",
        seo_twitter_site: ""
      });
      setShowBlogDialog(true);
    } finally {
      setIsFetchingDetails(false);
    }
  };
  const handleSaveBlog = async () => {
    if (!blogForm.title || !blogForm.description || !blogForm.content) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    if (!blogForm.category_id || blogForm.category_id === 0) {
      showToast("Please select a category", "error");
      return;
    }
    setIsSavingBlog(true);
    try {
      let result;
      if (imageFile) {
        result = editingBlog ? await adminBlogService.updateWithImage(editingBlog.id, blogForm, imageFile) : await adminBlogService.createWithImage(blogForm, imageFile);
      } else {
        result = editingBlog ? await adminBlogService.update(editingBlog.id, blogForm) : await adminBlogService.create(blogForm);
      }
      if (result.success) {
        showToast(`Blog ${editingBlog ? "updated" : "created"} successfully`, "success");
        setShowBlogDialog(false);
        setImageFile(null);
        setImagePreview("");
        fetchBlogs(currentPage);
      } else {
        showToast(result.message || "Failed to save blog", "error");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      showToast("An error occurred while saving", "error");
    } finally {
      setIsSavingBlog(false);
    }
  };
  const handleCreateCategory = () => {
    setCategoryForm({
      title: "",
      description: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      sort_order: blogCategories.length + 1,
      is_active: true
    });
    setShowCategoryDialog(true);
  };
  const handleSaveCategory = async () => {
    if (!categoryForm.title || !categoryForm.description) {
      showToast("Please fill in title and description", "error");
      return;
    }
    setIsSavingCategory(true);
    try {
      const result = await adminBlogCategoryService.create(categoryForm);
      if (result.success) {
        showToast("Category created successfully", "success");
        setShowCategoryDialog(false);
        fetchCategories();
      } else {
        showToast(result.message || "Failed to create category", "error");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      showToast("An error occurred while creating category", "error");
    } finally {
      setIsSavingCategory(false);
    }
  };
  const handleViewBlog = (blog) => {
    setViewingBlog(blog);
    setShowViewDialog(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
          "Published"
        ] });
      case "draft":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-slate-500/10 text-slate-400 border-slate-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3 mr-1" }),
          "Draft"
        ] });
      case "scheduled":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-500/10 text-blue-400 border-blue-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
          "Scheduled"
        ] });
    }
  };
  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 max-w-7xl mx-auto relative", children: [
    isFetchingDetails && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-primary animate-spin" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl md:text-2xl font-bold mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-primary" }),
          "Blog Management"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Create and manage your blog content" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleCreateCategory, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-4 h-4 mr-2" }),
          "New Category"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => fetchBlogs(currentPage), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
          "Refresh"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary hover:bg-primary/90", onClick: handleCreateBlog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "New Article"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      { label: "Total Posts", value: totalBlogs, icon: BookOpen, color: "text-blue-500" },
      { label: "Published", value: publishedCount, icon: CircleCheckBig, color: "text-emerald-500" },
      { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-purple-500" },
      { label: "Categories", value: blogCategories.length, icon: Tag, color: "text-pink-500" }
    ].map((stat) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: stat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: stat.value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2.5 rounded-lg bg-muted", stat.color), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) })
      ] }) }, stat.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search articles...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-10 bg-background"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "All", children: "All Categories" }),
          blogCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.title, children: cat.title }, cat.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedStatus, onValueChange: setSelectedStatus, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[150px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Published" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draft", children: "Draft" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "scheduled", children: "Scheduled" })
        ] })
      ] })
    ] }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-12 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 text-primary mx-auto mb-4 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading blogs..." })
    ] }) }),
    !isLoading && blogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4", children: blogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border overflow-hidden hover:border-primary/30 transition-all duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted", children: blog.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: blog.image_url,
          alt: blog.title,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-1 truncate", children: blog.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: blog.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleViewBlog(blog), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 mr-2" }),
                "View"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleEditBlog(blog), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4 mr-2" }),
                "Edit"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-red-500", onClick: () => handleDelete(blog.id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                "Delete"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[10px]", children: (blog.author?.name || "U").charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.author?.name || "Unknown" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(blog.published_at || blog.created_at || Date.now()), { addSuffix: true }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 mr-1" }),
            blog.category?.title || "Uncategorized"
          ] }),
          getStatusBadge(blog.status),
          blog.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs", children: "Featured" })
        ] }),
        blog.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            blog.views.toLocaleString(),
            " views"
          ] })
        ] }) }),
        blog.meta_keywords && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: blog.meta_keywords.split(",").map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: tag.trim() }, index)) })
      ] })
    ] }) }, blog.id)) }),
    !isLoading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => fetchBlogs(currentPage - 1),
          disabled: currentPage === 1,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const page = i + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: currentPage === page ? "default" : "outline",
            size: "sm",
            onClick: () => fetchBlogs(page),
            children: page
          },
          page
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => fetchBlogs(currentPage + 1),
          disabled: currentPage === totalPages,
          children: "Next"
        }
      )
    ] }),
    !isLoading && blogs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-12 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-2", children: "No articles found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: searchQuery || selectedCategory !== "All" || selectedStatus !== "all" ? "Try adjusting your filters" : "Get started by creating your first article" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreateBlog, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Create Article"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showBlogDialog, onOpenChange: setShowBlogDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingBlog ? "Edit Article" : "Create New Article" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: editingBlog ? "Update the complete article details below" : "Fill in the details to create a new blog article" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-category", children: "Category *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: blogForm.category_id.toString(),
              onValueChange: (value) => setBlogForm({ ...blogForm, category_id: parseInt(value) }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: blogCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.id.toString(), children: cat.title }, cat.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-title", children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-title",
              value: blogForm.title,
              onChange: (e) => setBlogForm({ ...blogForm, title: e.target.value }),
              placeholder: "Enter article title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-description", children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "blog-description",
              value: blogForm.description,
              onChange: (e) => setBlogForm({ ...blogForm, description: e.target.value }),
              placeholder: "Brief description of the article",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-content", children: "Content *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "blog-content",
              value: blogForm.content,
              onChange: (e) => setBlogForm({ ...blogForm, content: e.target.value }),
              placeholder: "Full article content (HTML supported)",
              rows: 8
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-image", children: "Featured Image (Upload)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-image",
              type: "file",
              accept: "image/*",
              onChange: handleImageChange,
              className: "cursor-pointer"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-image-url", children: "Or Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-image-url",
              type: "text",
              value: blogForm.image_url,
              onChange: (e) => setBlogForm({ ...blogForm, image_url: e.target.value }),
              placeholder: "https://example.com/image.jpg"
            }
          ),
          (imagePreview || blogForm.image_url) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imagePreview || blogForm.image_url,
              alt: "Preview",
              className: "w-full max-w-sm h-40 object-cover rounded-lg border border-border",
              onError: (e) => {
                e.target.style.display = "none";
              },
              onLoad: (e) => {
                e.target.style.display = "block";
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-status", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: blogForm.status,
                onValueChange: (value) => setBlogForm({ ...blogForm, status: value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draft", children: "Draft" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Published" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "scheduled", children: "Scheduled" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                id: "blog-featured",
                checked: blogForm.is_featured,
                onChange: (e) => setBlogForm({ ...blogForm, is_featured: e.target.checked }),
                className: "w-4 h-4 rounded border-gray-300"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-featured", className: "cursor-pointer", children: "Featured Article" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-meta-title", children: "Meta Title (Basic SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-meta-title",
              value: blogForm.meta_title,
              onChange: (e) => setBlogForm({ ...blogForm, meta_title: e.target.value }),
              placeholder: "Basic SEO meta title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-meta-description", children: "Meta Description (Basic SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "blog-meta-description",
              value: blogForm.meta_description,
              onChange: (e) => setBlogForm({ ...blogForm, meta_description: e.target.value }),
              placeholder: "Basic SEO meta description",
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-meta-keywords", children: "Meta Keywords (Basic SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-meta-keywords",
              value: blogForm.meta_keywords,
              onChange: (e) => setBlogForm({ ...blogForm, meta_keywords: e.target.value }),
              placeholder: "keyword1, keyword2, keyword3"
            }
          )
        ] }),
        editingBlog && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-6 border-t border-border space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-5 h-5 text-primary" }),
              " Advanced Edit Fields"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Modify advanced URL settings and publish timings." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-slug", children: "Slug (URL Route)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "blog-slug",
                value: blogForm.slug,
                onChange: (e) => setBlogForm({ ...blogForm, slug: e.target.value }),
                placeholder: "e.g. your-article-slug"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "blog-published-at", children: "Published At" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "blog-published-at",
                type: "datetime-local",
                value: blogForm.published_at,
                onChange: (e) => setBlogForm({ ...blogForm, published_at: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-2 mt-4 border-t border-border pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-primary" }),
              " Advanced SEO Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage dedicated SEO properties for this blog." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "seo-title", children: "SEO Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "seo-title",
                value: blogForm.seo_title,
                onChange: (e) => setBlogForm({ ...blogForm, seo_title: e.target.value }),
                placeholder: "SEO specific title"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "seo-description", children: "SEO Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "seo-description",
                value: blogForm.seo_description,
                onChange: (e) => setBlogForm({ ...blogForm, seo_description: e.target.value }),
                placeholder: "SEO specific description",
                rows: 2
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "seo-keywords", children: "SEO Keywords" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-keywords",
                  value: blogForm.seo_keywords,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_keywords: e.target.value }),
                  placeholder: "keyword1, keyword2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "seo-canonical", children: "Canonical URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-canonical",
                  value: blogForm.seo_canonical,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_canonical: e.target.value }),
                  placeholder: "https://example.com/canonical-url"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "seo-og-image", children: "OG Image URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-og-image",
                  value: blogForm.seo_og_image,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_og_image: e.target.value }),
                  placeholder: "https://example.com/image.png"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "seo-twitter", children: "Twitter Card Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-twitter",
                  value: blogForm.seo_twitter_card,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_twitter_card: e.target.value }),
                  placeholder: "summary_large_image"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "seo-twitter-site", children: "Twitter Site Username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-twitter-site",
                  value: blogForm.seo_twitter_site,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_twitter_site: e.target.value }),
                  placeholder: "@username"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowBlogDialog(false), disabled: isSavingBlog, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveBlog, disabled: isSavingBlog, children: isSavingBlog ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
          "Saving..."
        ] }) : editingBlog ? "Update Article" : "Create Article" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCategoryDialog, onOpenChange: setShowCategoryDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new blog category to organize your articles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "cat-title", children: "Category Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cat-title",
              value: categoryForm.title,
              onChange: (e) => setCategoryForm({ ...categoryForm, title: e.target.value }),
              placeholder: "Enter category title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "cat-description", children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "cat-description",
              value: categoryForm.description,
              onChange: (e) => setCategoryForm({ ...categoryForm, description: e.target.value }),
              placeholder: "Brief description of this category",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "cat-meta-title", children: "Meta Title (SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cat-meta-title",
              value: categoryForm.meta_title,
              onChange: (e) => setCategoryForm({ ...categoryForm, meta_title: e.target.value }),
              placeholder: "SEO meta title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "cat-meta-description", children: "Meta Description (SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "cat-meta-description",
              value: categoryForm.meta_description,
              onChange: (e) => setCategoryForm({ ...categoryForm, meta_description: e.target.value }),
              placeholder: "SEO meta description",
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "cat-meta-keywords", children: "Meta Keywords (SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cat-meta-keywords",
              value: categoryForm.meta_keywords,
              onChange: (e) => setCategoryForm({ ...categoryForm, meta_keywords: e.target.value }),
              placeholder: "keyword1, keyword2, keyword3"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "cat-sort-order", children: "Sort Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cat-sort-order",
                type: "number",
                value: categoryForm.sort_order,
                onChange: (e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) || 1 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                id: "cat-active",
                checked: categoryForm.is_active,
                onChange: (e) => setCategoryForm({ ...categoryForm, is_active: e.target.checked }),
                className: "w-4 h-4 rounded border-gray-300"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "cat-active", className: "cursor-pointer", children: "Active" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowCategoryDialog(false), disabled: isSavingCategory, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveCategory, disabled: isSavingCategory, children: isSavingCategory ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
          "Creating..."
        ] }) : "Create Category" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showViewDialog, onOpenChange: setShowViewDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl", children: viewingBlog?.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs", children: (viewingBlog?.author?.name || "U").charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: viewingBlog?.author?.name || "Unknown Author" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: viewingBlog?.published_at ? formatDistanceToNow(new Date(viewingBlog.published_at), { addSuffix: true }) : formatDistanceToNow(new Date(viewingBlog?.created_at || Date.now()), { addSuffix: true }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: viewingBlog?.category?.title || "Uncategorized" }),
          viewingBlog?.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs", children: "Featured" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
        viewingBlog?.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-64 rounded-lg overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: viewingBlog.image_url,
            alt: viewingBlog.title,
            className: "w-full h-full object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: viewingBlog?.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase", children: "Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "prose prose-sm dark:prose-invert max-w-none",
              dangerouslySetInnerHTML: { __html: viewingBlog?.content || "" }
            }
          )
        ] }),
        viewingBlog?.meta_keywords && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase", children: "Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: viewingBlog.meta_keywords.split(",").map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: tag.trim() }, index)) })
        ] }),
        viewingBlog?.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 pt-4 border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
              viewingBlog?.views?.toLocaleString() || 0,
              " views"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: getStatusBadge(viewingBlog.status) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowViewDialog(false), children: "Close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setShowViewDialog(false);
          if (viewingBlog) handleEditBlog(viewingBlog);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4 mr-2" }),
          "Edit Article"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  BlogManagement as default
};
