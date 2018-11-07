// Type definitions for signalr-no-jquery 1.8.0
// Project: http://www.asp.net/signalr
// Definitions by: Boris Yankov <https://github.com/borisyankov>, T. Michael Keesey <https://github.com/keesey>, Giedrius Grabauskas <https://github.com/GiedriusGrabauskas>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

export const enum ConnectionState {
    Connecting = 0,
    Connected = 1,
    Reconnecting = 2,
    Disconnected = 4
  }
  
  export interface AvailableEvents {
    onStart: string;
    onStarting: string;
    onReceived: string;
    onError: string;
    onConnectionSlow: string;
    onReconnect: string;
    onStateChanged: string;
    onDisconnect: string;
  }
  
  export interface Transport {
    name: string;
    supportsKeepAlive(): boolean;
    send(connection: Connection, data: any): void;
    start(
      connection: Connection,
      onSuccess: () => void,
      onFailed: (error?: ConnectionError) => void
    ): void;
    reconnect(connection: Connection): void;
    lostConnection(connection: Connection): void;
    stop(connection: Connection): void;
    abort(connection: Connection, async: boolean): void;
  }
  
  export interface Transports {
    foreverFrame: Transport;
    longPolling: Transport;
    serverSentEvents: Transport;
    webSockets: Transport;
  }
  
  export interface Proxy {
    state: any;
    connection: Connection;
    hubName: string;
    init(connection: Connection, hubName: string): void;
    hasSubscriptions(): boolean;
    /**
     * Wires up a callback to be invoked when a invocation request is received from the server hub.
     *
     * @param eventName The name of the hub event to register the callback for.
     * @param callback The callback to be invoked.
     */
    on(eventName: string, callback: (...msg: any[]) => void): Proxy;
    /**
     * Removes the callback invocation request from the server hub for the given event name.
     *
     * @param eventName The name of the hub event to unregister the callback for.
     * @param callback The callback to be invoked.
     */
    off(eventName: string, callback: (...msg: any[]) => void): Proxy;
    /**
     * Invokes a server hub method with the given arguments.
     *
     * @param methodName The name of the server hub method.
     */
    invoke(methodName: string, ...args: any[]): JQueryPromise<any>;
  }
  
  export interface Options {
    qs?: string;
    logging?: boolean;
    useDefaultPath?: boolean;
  }
  
  export interface ClientHubInvocation {
    Hub: string;
    Method: string;
    Args: string;
    State: string;
  }
  
  export interface HubConnection extends Connection {
    proxies: { [hubName: string]: any };
    transport: { name: string; supportsKeepAlive: () => boolean };
    /**
     * Creates a new proxy object for the given hub connection that can be used to invoke
     * methods on server hubs and handle client method invocation requests from the server.
     *
     * @param hubName The name of the hub on the server to create the proxy for.
     */
    createHubProxy(hubName: string): Proxy;
  }
  
  export interface HubCreator {
    /**
     * Creates a new hub connection.
     *
     * @param url [Optional] The hub route url, defaults to "/signalr".
     * @param options [Optional] Settings to use when creating the hubConnection.
     */
    (url?: string, options?: Options): HubConnection;
  }
  
  export interface IHub {
    start(): void;
  }
  
  export interface StateChanged {
    oldState: number;
    newState: number;
  }
  
  export interface ConnectionStates {
    connecting: number;
    connected: number;
    reconnecting: number;
    disconnected: number;
  }
  
  export interface Resources {
    nojQuery: string;
    noTransportOnInit: string;
    errorOnNegotiate: string;
    stoppedWhileLoading: string;
    stoppedWhileNegotiating: string;
    errorParsingNegotiateResponse: string;
    errorDuringStartRequest: string;
    stoppedDuringStartRequest: string;
    errorParsingStartResponse: string;
    invalidStartResponse: string;
    protocolIncompatible: string;
    sendFailed: string;
    parseFailed: string;
    longPollFailed: string;
    eventSourceFailedToConnect: string;
    eventSourceError: string;
    webSocketClosed: string;
    pingServerFailedInvalidResponse: string;
    pingServerFailed: string;
    pingServerFailedStatusCode: string;
    pingServerFailedParse: string;
    noConnectionTransport: string;
    webSocketsInvalidState: string;
    reconnectTimeout: string;
    reconnectWindowTimeout: string;
  }
  
  export interface AjaxDefaults {
    processData: boolean;
    timeout: number;
    async: boolean;
    global: boolean;
    cache: boolean;
  }
  
  export interface ConnectionOptions {
    transport?: string | Array<string> | Transport;
    callback?: Function;
    waitForPageLoad?: boolean;
    jsonp?: boolean;
    pingInterval?: number;
    withCredentials?: boolean;
  }
  
  export interface SimplifyLocation {
    protocol: string;
    host: string;
  }
  
  export interface ConnectionErrorContext {
    readyState: number;
    responseText: string;
    status: number;
    statusText: string;
  }
  
  export interface ConnectionError extends Error {
    context: ConnectionErrorContext;
    transport?: string;
    source?: string;
  }
  
  export interface Connection {
    clientProtocol: string;
    ajaxDataType: string;
    contentType: string;
    id: string;
    json: JSON;
    logging: boolean;
    url: string;
    qs: string | Object;
    state: number;
    reconnectDelay: number;
    transportConnectTimeout: number;
    /**
     * This should be set by the server in response to the negotiate request (30s default)
     */
    disconnectTimeout: number;
    /**
     * This should be set by the server in response to the negotiate request
     */
    reconnectWindow: number;
    /**
     * Warn user of slow connection if we breach the X% mark of the keep alive timeout
     */
    keepAliveWarnAt: number;
  
    /**
     * Starts the connection
     */
    start(): JQueryPromise<any>;
  
    /**
     * Starts the connection
     *
     * @param callback A callback function to execute when the connection has started
     */
    start(callback: () => void): JQueryPromise<any>;
  
    /**
     * Starts the connection
     *
     * @param options Options map
     */
    start(options: ConnectionOptions): JQueryPromise<any>;
  
    /**
     * Starts the connection
     *
     * @param options Options map
     * @param calback A callback function to execute when the connection has started
     */
    start(options: ConnectionOptions, callback: () => void): JQueryPromise<any>;
  
    /**
     * Adds a callback that will be invoked before anything is sent over the connection
     *
     * @param calback A callback function to execute before the connection is fully instantiated.
     */
    starting(callback: () => void): Connection;
  
    /**
     * Sends data over the connection
     *
     * @param options Options map
     * @param calback The data to send over the connection
     */
    send(data: string): Connection;
  
    /**
     * Adds a callback that will be invoked after anything is received over the connection
     *
     * @param calback A callback function to execute when any data is received on the connection
     */
    received(callback: (data: any) => void): Connection;
  
    /**
     * Adds a callback that will be invoked when the connection state changes
     *
     * @param calback A callback function to execute when the connection state changes
     */
    stateChanged(callback: (change: StateChanged) => void): Connection;
  
    /**
     * Adds a callback that will be invoked after an error occurs with the connection
     *
     * @param calback A callback function to execute when an error occurs on the connection
     */
    error(callback: (error: ConnectionError) => void): Connection;
  
    /**
     * Adds a callback that will be invoked when the client disconnects
     *
     * @param calback A callback function to execute when the connection is broken
     */
    disconnected(callback: () => void): Connection;
  
    /**
     * Adds a callback that will be invoked when the client detects a slow connection
     *
     * @param calback A callback function to execute when the connection is slow
     */
    connectionSlow(callback: () => void): Connection;
  
    /**
     * Adds a callback that will be invoked when the underlying transport begins reconnecting
     *
     * @param calback A callback function to execute when the connection enters a reconnecting state
     */
    reconnecting(callback: () => void): Connection;
  
    /**
     * Adds a callback that will be invoked when the underlying transport reconnects
     *
     * @param calback A callback function to execute when the connection is restored
     */
    reconnected(callback: () => void): Connection;
  
    /**
     * Stops listening
     *
     * @param async Whether or not to asynchronously abort the connection
     * @param notifyServer Whether we want to notify the server that we are aborting the connection
     */
    stop(async?: boolean, notifyServer?: boolean): Connection;
  
    log(msg: string): Connection;
  
    /**
     * Checks if url is cross domain
     *
     * @param url The base URL
     * @param against An optional argument to compare the URL against, if not specified it will be set to window.location. If specified it must contain a protocol and a host property.
     */
    isCrossDomain(url: string, against?: Location | SimplifyLocation): boolean;
  
    hub: HubConnection;
  
    lastError: ConnectionError;
    resources: Resources;
  }
  
  /**
   * Allows jQuery Promises to interop with non-jQuery promises
   */
  interface JQueryGenericPromise<T> {
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     *
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @see {@link https://api.jquery.com/deferred.then/#deferred-then-doneFilter-failFilter-progressFilter}
     */
    then<U>(
      doneFilter: (value?: T, ...values: any[]) => U | JQueryPromise<U>,
      failFilter?: (...reasons: any[]) => any,
      progressFilter?: (...progression: any[]) => any
    ): JQueryPromise<U>;
  
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     *
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @see {@link https://api.jquery.com/deferred.then/#deferred-then-doneFilter-failFilter-progressFilter}
     */
    then(
      doneFilter: (value?: T, ...values: any[]) => void,
      failFilter?: (...reasons: any[]) => any,
      progressFilter?: (...progression: any[]) => any
    ): JQueryPromise<void>;
  }
  
  /**
   * Interface for the JQuery promise/deferred callbacks
   */
  interface JQueryPromiseCallback<T> {
    (value?: T, ...args: any[]): void;
  }
  
  /**
   * Interface for the JQuery promise, part of callbacks
   * @see {@link https://api.jquery.com/category/deferred-object/}
   */
  interface JQueryPromise<T> extends JQueryGenericPromise<T> {
    /**
     * Determine the current state of a Deferred object.
     * @see {@link https://api.jquery.com/deferred.state/}
     */
    state(): string;
    /**
     * Add handlers to be called when the Deferred object is either resolved or rejected.
     *
     * @param alwaysCallback1 A function, or array of functions, that is called when the Deferred is resolved or rejected.
     * @param alwaysCallbackN Optional additional functions, or arrays of functions, that are called when the Deferred is resolved or rejected.
     * @see {@link https://api.jquery.com/deferred.always/}
     */
    always(
      alwaysCallback1?: JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[],
      ...alwaysCallbackN: Array<
        JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[]
      >
    ): JQueryPromise<T>;
    /**
     * Add handlers to be called when the Deferred object is resolved.
     *
     * @param doneCallback1 A function, or array of functions, that are called when the Deferred is resolved.
     * @param doneCallbackN Optional additional functions, or arrays of functions, that are called when the Deferred is resolved.
     * @see {@link https://api.jquery.com/deferred.done/}
     */
    done(
      doneCallback1?: JQueryPromiseCallback<T> | JQueryPromiseCallback<T>[],
      ...doneCallbackN: Array<
        JQueryPromiseCallback<T> | JQueryPromiseCallback<T>[]
      >
    ): JQueryPromise<T>;
    /**
     * Add handlers to be called when the Deferred object is rejected.
     *
     * @param failCallback1 A function, or array of functions, that are called when the Deferred is rejected.
     * @param failCallbackN Optional additional functions, or arrays of functions, that are called when the Deferred is rejected.
     * @see {@link https://api.jquery.com/deferred.fail/}
     */
    fail(
      failCallback1?: JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[],
      ...failCallbackN: Array<
        JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[]
      >
    ): JQueryPromise<T>;
    /**
     * Add handlers to be called when the Deferred object generates progress notifications.
     *
     * @param progressCallback1 A function, or array of functions, to be called when the Deferred generates progress notifications.
     * @param progressCallbackN Optional additional functions, or arrays of functions, to be called when the Deferred generates progress notifications.
     * @see {@link https://api.jquery.com/deferred.progress/}
     */
    progress(
      progressCallback1?:
        | JQueryPromiseCallback<any>
        | JQueryPromiseCallback<any>[],
      ...progressCallbackN: Array<
        JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[]
      >
    ): JQueryPromise<T>;
  
    // Deprecated - given no typings
    pipe(
      doneFilter?: (x: any) => any,
      failFilter?: (x: any) => any,
      progressFilter?: (x: any) => any
    ): JQueryPromise<any>;
  
    /**
     * Return a Deferred's Promise object.
     *
     * @param target Object onto which the promise methods have to be attached
     * @see {@link https://api.jquery.com/deferred.promise/}
     */
    promise(target?: any): JQueryPromise<T>;
  }
  
  export interface SignalR {
    /**
     * Creates a new SignalR connection for the given url
     *
     * @param url   The URL of the long polling endpoint
     * @param queryString   [Optional] Custom querystring parameters to add to the connection URL. If an object, every non-function member will be added to the querystring. If a string, it's added to the QS as specified.
     * @param logging [Optional] A flag indicating whether connection logging is enabled to the browser console/log. Defaults to false.
     */
    (url: string, queryString?: string | Object, logging?: boolean): Connection;
    ajaxDefaults: AjaxDefaults;
    changeState(
      connection: Connection,
      expectedState: number,
      newState: number
    ): void;
    connectionState: ConnectionStates;
    events: AvailableEvents;
    transports: Transports;
    hub: HubConnection;
    hubConnection: HubCreator;
    isDisconnecting(connection: Connection): boolean;
    /**
     *   Reinstates the original value of $.connection and returns the signalR object for manual assignment.
     */
    noConflict(): Connection;
    /**
     *   Current SignalR version.
     */
    version: string;
  }
  
  declare var signalR: SignalR;
  declare var connection: SignalR;
  declare var hubConnection: HubCreator;
  
