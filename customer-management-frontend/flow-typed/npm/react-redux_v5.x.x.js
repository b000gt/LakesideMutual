// flow-typed signature: b872fdc4da6b0c1021c55df6fab87e73
// flow-typed version: f8afc4cfdd/react-redux_v5.x.x/flow_>=v0.68.0 <=v0.84.x

declare module "react-redux" {
  import type { ComponentType, ElementConfig } from 'react';

  // These types are copied directly from the redux libdef. Importing them in
  // this libdef causes a loss in type coverage.
  declare type DispatchAPI<A> = (action: A) => A;
  declare type Dispatch<A: { type: $Subtype<string> }> = DispatchAPI<A>;
  declare type Reducer<S, A> = (state: S | void, action: A) => S;
  declare type Store<S, A, D = Dispatch<A>> = {
    dispatch: D;
    getState(): S;
    subscribe(listener: () => void): () => void;
    replaceReducer(nextReducer: Reducer<S, A>): void
  };

  declare export class Provider<S, A, D> extends React$Component<{
    store: Store<S, A, D>,
    children?: any
  }> {}

  declare export function createProvider(
    storeKey?: string,
    subKey?: string
  ): Provider<*, *, *>;

  /*

  S = State
  A = Action
  OP = OwnProps
  SP = StateProps
  DP = DispatchProps
  MP = Merge props
  MDP = Map dispatch to props object
  RSP = Returned state props
  RDP = Returned dispatch props
  RMP = Returned merge props
  CP = Props for returned component
  Com = React Component
  ST = Static properties of Com
  EFO = Extra factory options (used only in connectAdvanced)
  */

  declare type MapStateToProps<S: Object, SP: Object, RSP: Object> = (state: S, props: SP) => RSP;

  declare type MapDispatchToProps<A, OP: Object, RDP: Object> = (dispatch: Dispatch<A>, ownProps: OP) => RDP;

  declare type MergeProps<SP: Object, DP: Object, MP: Object, RMP: Object> = (
    stateProps: SP,
    dispatchProps: DP,
    ownProps: MP
  ) => RMP;

  declare type ConnectOptions<S: Object, OP: Object, RSP: Object, RMP: Object> = {|
    pure?: boolean,
    withRef?: boolean,
    areStatesEqual?: (next: S, prev: S) => boolean,
    areOwnPropsEqual?: (next: OP, prev: OP) => boolean,
    areStatePropsEqual?: (next: RSP, prev: RSP) => boolean,
    areMergedPropsEqual?: (next: RMP, prev: RMP) => boolean,
    storeKey?: string
  |};

  declare type OmitDispatch<Component> = $Diff<Component, {dispatch?: Dispatch<*>}>;

  declare type ConnectAdvancedOptions = {
    getDisplayName?: (name: string) => string,
    methodName?: string,
    renderCountProp?: string,
    shouldHandleStateChanges?: boolean,
    storeKey?: string,
    withRef?: boolean,
  };

  declare type SelectorFactoryOptions<Com> = {
    getDisplayName: (name: string) => string,
    methodName: string,
    renderCountProp: ?string,
    shouldHandleStateChanges: boolean,
    storeKey: string,
    withRef: boolean,
    displayName: string,
    wrappedComponentName: string,
    WrappedComponent: Com,
  };

  declare type SelectorFactory<
    Com: ComponentType<*>,
    A,
    S: Object,
    OP: Object,
    EFO: Object,
    CP: Object
  > = (dispatch: Dispatch<A>, factoryOptions: SelectorFactoryOptions<Com> & EFO) =>
      MapStateToProps<S, OP, CP>;

  declare export function connectAdvanced<
    Com: ComponentType<*>,
    A,
    S: Object,
    OP: Object,
    CP: Object,
    EFO: Object,
    ST: {[_: $Keys<Com>]: any}
    >(
    selectorFactory: SelectorFactory<Com, A, S, OP, EFO, CP>,
    connectAdvancedOptions: ?(ConnectAdvancedOptions & EFO),
  ): (component: Com) => ComponentType<OP> & $Shape<ST>;

  declare export function connect<
    Com: ComponentType<*>,
    S: Object,
    SP: Object,
    RSP: Object,
    CP: $Diff<OmitDispatch<ElementConfig<Com>>, RSP>,
    ST: {[_: $Keys<Com>]: any}
    >(
    mapStateToProps: MapStateToProps<S, SP, RSP>,
    mapDispatchToProps?: null
  ): (component: Com) => ComponentType<CP & SP> & $Shape<ST>;

  declare export function connect<
    Com: ComponentType<*>,
    ST: {[_: $Keys<Com>]: any}
    >(
    mapStateToProps?: null,
    mapDispatchToProps?: null
  ): (component: Com) => ComponentType<OmitDispatch<ElementConfig<Com>>> & $Shape<ST>;

  declare export function connect<
    Com: ComponentType<*>,
    A,
    S: Object,
    DP: Object,
    SP: Object,
    RSP: Object,
    RDP: Object,
    CP: $Diff<$Diff<ElementConfig<Com>, RSP>, RDP>,
    ST: $Subtype<{[_: $Keys<Com>]: any}>
    >(
    mapStateToProps: MapStateToProps<S, SP, RSP>,
    mapDispatchToProps: MapDispatchToProps<A, DP, RDP>
  ): (component: Com) => ComponentType<CP & SP & DP> & $Shape<ST>;

  declare export function connect<
    Com: ComponentType<*>,
    A,
    OP: Object,
    DP: Object,
    PR: Object,
    CP: $Diff<ElementConfig<Com>, DP>,
    ST: $Subtype<{[_: $Keys<Com>]: any}>
    >(
    mapStateToProps?: null,
    mapDispatchToProps: MapDispatchToProps<A, OP, DP>
  ): (Com) => ComponentType<CP & OP>;

  declare export function connect<
    Com: ComponentType<*>,
    MDP: Object,
    ST: $Subtype<{[_: $Keys<Com>]: any}>
    >(
    mapStateToProps?: null,
    mapDispatchToProps: MDP
  ): (component: Com) => ComponentType<$Diff<ElementConfig<Com>, MDP>> & $Shape<ST>;

  declare export function connect<
    Com: ComponentType<*>,
    S: Object,
    SP: Object,
    RSP: Object,
    MDP: Object,
    CP: $Diff<ElementConfig<Com>, RSP>,
    ST: $Subtype<{[_: $Keys<Com>]: any}>
    >(
    mapStateToProps: MapStateToProps<S, SP, RSP>,
    mapDispatchToProps: MDP
  ): (component: Com) => ComponentType<$Diff<CP, MDP> & SP> & $Shape<ST>;

  declare export function connect<
    Com: ComponentType<*>,
    A,
    S: Object,
    DP: Object,
    SP: Object,
    RSP: Object,
    RDP: Object,
    MP: Object,
    RMP: Object,
    CP: $Diff<ElementConfig<Com>, RMP>,
    ST: $Subtype<{[_: $Keys<Com>]: any}>
    >(
    mapStateToProps: MapStateToProps<S, SP, RSP>,
    mapDispatchToProps: ?MapDispatchToProps<A, DP, RDP>,
    mergeProps: MergeProps<RSP, RDP, MP, RMP>
  ): (component: Com) => ComponentType<CP & SP & DP & MP> & $Shape<ST>;

  declare export function connect<
    Com: ComponentType<*>,
    A,
    S: Object,
    DP: Object,
    SP: Object,
    RSP: Object,
    RDP: Object,
    MDP: Object,
    MP: Object,
    RMP: Object,
    CP: $Diff<ElementConfig<Com>, RMP>,
    ST: $Subtype<{[_: $Keys<Com>]: any}>
    >(
    mapStateToProps: MapStateToProps<S, SP, RSP>,
    mapDispatchToProps: MDP,
    mergeProps: MergeProps<RSP, RDP, MP, RMP>
  ): (component: Com) => ComponentType<CP & SP & DP & MP> & $Shape<ST>;

  declare export function connect<Com: ComponentType<*>,
    A,
    S: Object,
    DP: Object,
    SP: Object,
    RSP: Object,
    RDP: Object,
    MP: Object,
    RMP: Object,
    ST: $Subtype<{[_: $Keys<Com>]: any}>
    >(
    mapStateToProps: ?MapStateToProps<S, SP, RSP>,
    mapDispatchToProps: ?MapDispatchToProps<A, DP, RDP>,
    mergeProps: ?MergeProps<RSP, RDP, MP, RMP>,
    options: ConnectOptions<S, SP & DP & MP, RSP, RMP>
  ): (component: Com) => ComponentType<$Diff<ElementConfig<Com>, RMP> & SP & DP & MP> & $Shape<ST>;

  declare export function connect<Com: ComponentType<*>,
    A,
    S: Object,
    DP: Object,
    SP: Object,
    RSP: Object,
    RDP: Object,
    MDP: Object,
    MP: Object,
    RMP: Object,
    ST: $Subtype<{[_: $Keys<Com>]: any}>
    >(
    mapStateToProps: ?MapStateToProps<S, SP, RSP>,
    mapDispatchToProps: ?MapDispatchToProps<A, DP, RDP>,
    mergeProps: MDP,
    options: ConnectOptions<S, SP & DP & MP, RSP, RMP>
  ): (component: Com) => ComponentType<$Diff<ElementConfig<Com>, RMP> & SP & DP & MP> & $Shape<ST>;

  declare export default {
    Provider: typeof Provider,
    createProvider: typeof createProvider,
    connect: typeof connect,
    connectAdvanced: typeof connectAdvanced,
  };
}
