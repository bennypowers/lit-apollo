/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { PropertyPart } from 'lit-html';
import { Adapter, Foundation } from '@material/mwc-base/base-element.js';
export interface RippleOptions {
    interactionNode?: HTMLElement;
    unbounded?: boolean;
    disabled?: boolean;
    active?: boolean;
}
export interface RippleNodeOptions extends RippleOptions {
    surfaceNode: HTMLElement;
}
export interface RippleFoundation extends Foundation {
    setUnbounded(value: boolean): void;
    activate(): void;
    deactivate(): void;
}
export declare var RippleFoundation: {
    prototype: RippleFoundation;
    new (adapter: Adapter): RippleFoundation;
};
/**
 * Applied a ripple to the node specified by {surfaceNode}.
 * @param options {RippleNodeOptions}
 */
export declare const rippleNode: (options: RippleNodeOptions) => RippleFoundation;
/**
 * A directive that applies a Material ripple to a part node. The directive
 * should be applied to a PropertyPart.
 * @param options {RippleOptions}
 */
export declare const ripple: (options?: RippleOptions) => (part: PropertyPart) => void;
