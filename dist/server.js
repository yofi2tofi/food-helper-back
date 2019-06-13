/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "7c1e1517a3e3140f5c72";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\nconst logger = __webpack_require__(/*! morgan */ \"morgan\");\nconst compression = __webpack_require__(/*! compression */ \"compression\");\nconst swaggerUi = __webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\");\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst swaggerDocument = __webpack_require__(/*! ./swagger.json */ \"./swagger.json\");\n\nconst indexRouter = __webpack_require__(/*! ./routes/index */ \"./routes/index.js\");\nconst usersRouter = __webpack_require__(/*! ./routes/user */ \"./routes/user.js\");\nconst authRouter = __webpack_require__(/*! ./routes/auth */ \"./routes/auth.js\");\nconst dishRouter = __webpack_require__(/*! ./routes/dish */ \"./routes/dish.js\");\n\nconst authenticate = __webpack_require__(/*! ./middlewares/authenticate */ \"./middlewares/authenticate.js\");\n\nconst app = express();\n\n__webpack_require__(/*! ./passport/local */ \"./passport/local.js\");\n__webpack_require__(/*! ./passport/google */ \"./passport/google.js\");\n\n__webpack_require__(/*! ./validationSchemas/validation.module */ \"./validationSchemas/validation.module.js\");\n\napp.use(logger('dev'));\napp.use(express.json());\napp.use(express.urlencoded({ extended: false }));\napp.use(cookieParser());\napp.use(express.static(path.join(__dirname, 'public')));\napp.use(compression());\napp.use(passport.initialize());\n\napp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));\n\napp.use('/api/v1/auth', authRouter);\napp.use('/api/v1/user', authenticate(), usersRouter);\napp.use('/api/v1/dish', dishRouter);\napp.use('*', authenticate(), indexRouter);\n\nmodule.exports = app;\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./bin/www.js":
/*!********************!*\
  !*** ./bin/www.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Module dependencies.\n */\n\nvar app = __webpack_require__(/*! ../app */ \"./app.js\");\nvar debug = __webpack_require__(/*! debug */ \"debug\")('foodhelperback:server');\nvar http = __webpack_require__(/*! http */ \"http\");\n\n/**\n * Get port from environment and store in Express.\n */\n\nvar port = normalizePort(process.env.PORT || '3000');\napp.set('port', port);\n\n/**\n * Create HTTP server.\n */\n\nvar server = http.createServer(app);\n\n/**\n * Listen on provided port, on all network interfaces.\n */\n\nserver.listen(port);\nserver.on('error', onError);\nserver.on('listening', onListening);\n\n/**\n * Normalize a port into a number, string, or false.\n */\n\nfunction normalizePort(val) {\n  var port = parseInt(val, 10);\n\n  if (isNaN(port)) {\n    // named pipe\n    return val;\n  }\n\n  if (port >= 0) {\n    // port number\n    return port;\n  }\n\n  return false;\n}\n\n/**\n * Event listener for HTTP server \"error\" event.\n */\n\nfunction onError(error) {\n  if (error.syscall !== 'listen') {\n    throw error;\n  }\n\n  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;\n\n  // handle specific listen errors with friendly messages\n  switch (error.code) {\n    case 'EACCES':\n      console.error(bind + ' requires elevated privileges');\n      process.exit(1);\n      break;\n    case 'EADDRINUSE':\n      console.error(bind + ' is already in use');\n      process.exit(1);\n      break;\n    default:\n      throw error;\n  }\n}\n\n/**\n * Event listener for HTTP server \"listening\" event.\n */\n\nfunction onListening() {\n  var addr = server.address();\n  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;\n  debug('Listening on ' + bind);\n}\n\nif (true) {\n  module.hot.accept();\n  module.hot.dispose(() => server.close());\n}\n\n\n//# sourceURL=webpack:///./bin/www.js?");

/***/ }),

/***/ "./db/db.module.js":
/*!*************************!*\
  !*** ./db/db.module.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst User = __webpack_require__(/*! ./schemas/user.schema */ \"./db/schemas/user.schema.js\");\nconst Dish = __webpack_require__(/*! ./schemas/dish.schema */ \"./db/schemas/dish.schema.js\");\nconst Ingredient = __webpack_require__(/*! ./schemas/ingredient.schema */ \"./db/schemas/ingredient.schema.js\");\n\nconst dbConfigUrl =\n   true\n    ? 'mongodb://yofi2tofi:ABF71824178907@ds263876.mlab.com:63876/food-helper-test'\n    : undefined;\n\nmongoose.connect(dbConfigUrl);\nvar db = mongoose.connection;\n\ndb.on('error', function(err) {\n  console.log('connection error:', err.message);\n});\n\ndb.once('open', function callback() {\n  console.log('Connected to DB!');\n});\n\nconst UserModel = mongoose.model('User', User);\nconst DishModel = mongoose.model('Dish', Dish);\nconst IngredientModel = mongoose.model('Ingredient', Ingredient);\n\nmodule.exports = {\n  UserModel: UserModel,\n  DishModel: DishModel,\n  IngredientModel: IngredientModel\n};\n\n\n//# sourceURL=webpack:///./db/db.module.js?");

/***/ }),

/***/ "./db/schemas/dish.schema.js":
/*!***********************************!*\
  !*** ./db/schemas/dish.schema.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = __webpack_require__(/*! mongoose */ \"mongoose\").Schema;\n\nconst Dish = new Schema({\n  time: Number,\n  title: String,\n  authorId: {\n    type: Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  coverImgUrl: String,\n  photos: {\n    type: Array\n  },\n  videoUrl: String,\n  complexity: Number,\n  recipe: String,\n  ingredients: [\n    {\n      type: Schema.Types.ObjectId,\n      ref: 'Ingredient'\n    }\n  ],\n  description: String,\n  price: Number,\n  proteins: Number,\n  fats: Number,\n  carbohydrates: Number,\n  minutes: Number\n});\n\nmodule.exports = Dish;\n\n\n//# sourceURL=webpack:///./db/schemas/dish.schema.js?");

/***/ }),

/***/ "./db/schemas/ingredient.schema.js":
/*!*****************************************!*\
  !*** ./db/schemas/ingredient.schema.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = __webpack_require__(/*! mongoose */ \"mongoose\").Schema;\n\nconst Ingredient = new Schema({\n  title: String,\n  measure: String,\n  energyValue: {\n    calories: Number,\n    carbs: Number,\n    fats: Number,\n    protein: Number\n  }\n});\n\nmodule.exports = Ingredient;\n\n\n//# sourceURL=webpack:///./db/schemas/ingredient.schema.js?");

/***/ }),

/***/ "./db/schemas/user.schema.js":
/*!***********************************!*\
  !*** ./db/schemas/user.schema.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst Schema = __webpack_require__(/*! mongoose */ \"mongoose\").Schema;\n\nconst User = new Schema({\n  method: String,\n  roles: {\n    type: String,\n    enum: ['user', 'admin']\n  },\n  local: {\n    username: { type: String, unique: true },\n    salt: String,\n    hashedPassword: String\n  },\n  hash: String,\n  salt: String,\n  refreshToken: String,\n  subId: Number,\n  subs: []\n});\n\nmodule.exports = User;\n\n\n//# sourceURL=webpack:///./db/schemas/user.schema.js?");

/***/ }),

/***/ "./middlewares/authenticate.js":
/*!*************************************!*\
  !*** ./middlewares/authenticate.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const passport = __webpack_require__(/*! passport */ \"passport\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst ExtractJwt = __webpack_require__(/*! passport-jwt */ \"passport-jwt\").ExtractJwt;\n\nconst { UserModel } = __webpack_require__(/*! ../db/db.module */ \"./db/db.module.js\");\n\n// Мидлвер првоерки авторизации и обновления токена\nmodule.exports = () => {\n  return async (req, res, next) => {\n    const accessToken = ExtractJwt.fromAuthHeaderWithScheme('Bearer')(req);\n    const refreshToken = req.headers.refresh_token;\n\n    try {\n      const verifiedAccessToken = jwt.verify(accessToken, 'secret');\n      const userId = verifiedAccessToken._id;\n\n      const newRefreshToken = jwt.sign({ _id: userId }, 'secret', {\n        expiresIn: '1h'\n      });\n\n      const updateUser = await UserModel.findByIdAndUpdate(userId, {\n        $set: { refreshToken: newRefreshToken }\n      }).exec();\n\n      res.append('refresh_token', newRefreshToken);\n\n      req.user = updateUser;\n      \n      next();\n    } catch (e) {\n      const decodedRefreshToken = jwt.decode(refreshToken, 'secret');\n      const userId = decodedRefreshToken._id;\n\n      const user = await UserModel.findById(userId);\n      const userRefreshToken = user.refreshToken;\n\n      if (refreshToken !== userRefreshToken) {\n        return res.status(401).json({ message: 'Вы не авторизованы' });\n      }\n\n      const newAccessToken = jwt.sign({ _id: userId }, 'secret', {\n        expiresIn: '1m'\n      });\n      const newRefreshToken = jwt.sign({ _id: userId }, 'secret', {\n        expiresIn: '1h'\n      });\n\n      const updateUser = await UserModel.findByIdAndUpdate(userId, {\n        $set: { refreshToken: newRefreshToken }\n      }).exec();\n\n      res.append('access_token', newAccessToken);\n      res.append('refresh_token', newRefreshToken);\n\n      req.user = updateUser;\n\n      return next();\n    }\n  };\n};\n\n\n//# sourceURL=webpack:///./middlewares/authenticate.js?");

/***/ }),

/***/ "./middlewares/userBodyValidator.js":
/*!******************************************!*\
  !*** ./middlewares/userBodyValidator.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const classValidator = __webpack_require__(/*! class-validator */ \"class-validator\");\n\nmodule.exports = (req, res, next) => {\n  classValidator.validate('userLocalSchema', req.body).then(errors => {\n    if (errors.length) {\n      const errorsMessages = errors.map(error => {\n        const key = error.property;\n        const messageRaw = error.constraints;\n\n        let message;\n        for (const key in messageRaw) {\n          message = messageRaw[key];\n        }\n\n        return { [key]: message };\n      });\n\n      return res.status(404).json(errorsMessages);\n    }\n\n    next();\n  });\n};\n\n\n//# sourceURL=webpack:///./middlewares/userBodyValidator.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + (err.stack || err.message));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\n\t\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\t\"[HMR] Update failed: \" + (err.stack || err.message)\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./passport/google.js":
/*!****************************!*\
  !*** ./passport/google.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const passport = __webpack_require__(/*! passport */ \"passport\");\nconst GoogleTokenStrategy = __webpack_require__(/*! passport-google-token */ \"passport-google-token\").Strategy;\n\npassport.use(\n  new GoogleTokenStrategy(\n    {\n      clientID:\n        '354513618601-ficclon4bei6lniem81rmno751fn8k90.apps.googleusercontent.com',\n      clientSecret: 'dOfP5aZKK4J69IlSFh75vq6r'\n    },\n    function(accessToken, refreshToken, profile, cb) {\n      console.log(accessToken, refreshToken, profile);\n      // User.findOrCreate({ googleId: profile.id }, function (err, user) {\n      //   return cb(err, user);\n      // });\n    }\n  )\n);\n\n\n//# sourceURL=webpack:///./passport/google.js?");

/***/ }),

/***/ "./passport/local.js":
/*!***************************!*\
  !*** ./passport/local.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const passport = __webpack_require__(/*! passport */ \"passport\");\nconst LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\").Strategy;\n\nconst { UserModel } = __webpack_require__(/*! ../db/db.module */ \"./db/db.module.js\");\nconst { generateSalt, generateHashedPassword } = __webpack_require__(/*! ../util/encryption */ \"./util/encryption.js\");\n\npassport.use(\n  'local-signup',\n  new LocalStrategy(\n    { usernameField: 'username', passwordField: 'password' },\n    async (username, password, done) => {\n      if (await UserModel.findOne({ 'local.username': username })) {\n        return done('Already exist', false);\n      }\n\n      try {\n        const salt = generateSalt();\n        const user = new UserModel({\n          method: 'local',\n          role: 'user',\n          local: {\n            username,\n            salt,\n            hashedPassword: generateHashedPassword(salt, password)\n          }\n        });\n\n        await user.save();\n\n        done(null, user);\n      } catch (error) {\n        done(error, false);\n      }\n    }\n  )\n);\n\npassport.use(\n  'local-signin',\n  new LocalStrategy(\n    { usernameField: 'username', passwordField: 'password' },\n    async (username, password, done) => {\n      try {\n        const user = await UserModel.findOne({\n          'local.username': username\n        });\n\n        if (!user) {\n          return done(\"User doesn't exist\", false);\n        }\n\n        if (\n          generateHashedPassword(user.local.salt, password) !==\n          user.local.hashedPassword\n        ) {\n          return done('password is wrong', false);\n        }\n\n        done(null, user);\n      } catch (error) {\n        done(error, false);\n      }\n    }\n  )\n);\n\n\n//# sourceURL=webpack:///./passport/local.js?");

/***/ }),

/***/ "./routes/auth.js":
/*!************************!*\
  !*** ./routes/auth.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst { UserModel } = __webpack_require__(/*! ../db/db.module */ \"./db/db.module.js\");\n\nconst bodyValidator = __webpack_require__(/*! ../middlewares/userBodyValidator */ \"./middlewares/userBodyValidator.js\");\n\nrouter.post('/signup', bodyValidator, (req, res, next) => {\n  passport.authenticate('local-signup', async (err, user, info) => {\n    if (err === 'Already exist') {\n      return res.status(500).json({ message: 'Пользователь уже существует' });\n    }\n    if (err) {\n      return res.status(500).json({ message: 'Что-то пошло не так =(' });\n    }\n    if (user) {\n      const accessToken = jwt.sign({ _id: user._id }, 'secret', {\n        expiresIn: '1m'\n      });\n      const refreshToken = jwt.sign({ _id: user._id }, 'secret', {\n        expiresIn: '1h'\n      });\n\n      const updateUser = await UserModel.findByIdAndUpdate(user._id, {\n        $set: { refreshToken }\n      }).exec();\n\n      return res.json({ accessToken, refreshToken });\n    }\n  })(req, res, next);\n});\n\nrouter.post('/signin', bodyValidator, (req, res, next) => {\n  passport.authenticate('local-signin', async (err, user, info) => {\n    if (err === \"User doesn't exist\") {\n      return res.status(400).json({ message: 'Пользователь не существует' });\n    }\n    if (err === 'password is wrong') {\n      return res.status(400).json({ message: 'Пароль не верен' });\n    }\n    if (err) {\n      return res.status(500).json({ message: 'Что-то пошло не так =(' });\n    }\n    if (user) {\n      const accessToken = jwt.sign({ _id: user._id }, 'secret', {\n        expiresIn: '1m'\n      });\n      const refreshToken = jwt.sign({ _id: user._id }, 'secret', {\n        expiresIn: '1h'\n      });\n\n      const updateUser = await UserModel.findByIdAndUpdate(user._id, {\n        $set: { refreshToken }\n      }).exec();\n\n      return res.json({ accessToken, refreshToken });\n    }\n  })(req, res, next);\n});\n\nrouter.get(\n  '/google',\n  passport.authenticate('google-token', { session: false }),\n  function(req, res) {\n    res.send(req.user);\n  }\n);\n\n// router.get('/google/callback', passport.authenticate('google-token'), function(\n//   req,\n//   res\n// ) {\n//   // res.redirect('/');\n// });\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./routes/auth.js?");

/***/ }),

/***/ "./routes/dish.js":
/*!************************!*\
  !*** ./routes/dish.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\nconst { DishModel } = __webpack_require__(/*! ../db/db.module */ \"./db/db.module.js\");\n\nrouter.get('/', async (req, res, next) => {\n  try {\n    const params = {\n      tags: req.query.tags,\n      authorId: req.query.authorId,\n      favorite: req.query.favorite\n    };\n\n    const dishes = await DishModel.find(params)\n      .sort({\n        [req.query.sortBy]: req.query.sortType\n      })\n      .skip()\n      .limit()\n      .exec();\n\n    return res.json({\n      data: dishes,\n      meta: {\n        limit: req.query.limit,\n        offset: req.query.offset\n      }\n    });\n  } catch (e) {\n    return res.status(500).json({ message: 'Что-то пошло не так =(' });\n  }\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./routes/dish.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\n\n/* GET 404 status. */\nrouter.get('/user', function(req, res, next) {\n  res.json({ message: 'user' });\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./routes/index.js?");

/***/ }),

/***/ "./routes/user.js":
/*!************************!*\
  !*** ./routes/user.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\n\n/* GET users listing. */\nrouter.get('/', (req, res, next) => {\n  res.json(req.user);\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./routes/user.js?");

/***/ }),

/***/ "./swagger.json":
/*!**********************!*\
  !*** ./swagger.json ***!
  \**********************/
/*! exports provided: swagger, info, host, basePath, tags, schemes, consumes, produces, paths, definitions, default */
/***/ (function(module) {

eval("module.exports = {\"swagger\":\"2.0\",\"info\":{\"version\":\"1.0.0\",\"title\":\"Yet Another Node.js Blogg Application API\",\"description\":\"Yet Another Node.js Blogg Application API\",\"license\":{\"name\":\"MIT\",\"url\":\"https://opensource.org/licenses/MIT\"}},\"host\":\"localhost:3000\",\"basePath\":\"/api/v1\",\"tags\":[{\"name\":\"Users\",\"description\":\"API for users in the system\"}],\"schemes\":[\"http\"],\"consumes\":[\"application/json\"],\"produces\":[\"application/json\"],\"paths\":{\"/users\":{\"post\":{\"tags\":[\"Users\"],\"description\":\"Create new user in system\",\"parameters\":[{\"name\":\"user\",\"in\":\"body\",\"description\":\"User that we want to create\",\"schema\":{\"$ref\":\"#/definitions/User\"}}],\"produces\":[\"application/json\"],\"responses\":{\"200\":{\"description\":\"New user is created\",\"schema\":{\"$ref\":\"#/definitions/User\"}}}},\"get\":{\"tags\":[\"Users\"],\"summary\":\"Get all users in system\",\"responses\":{\"200\":{\"description\":\"OK\",\"schema\":{\"$ref\":\"#/definitions/Users\"}}}}},\"/users/{userId}\":{\"parameters\":[{\"name\":\"userId\",\"in\":\"path\",\"required\":true,\"description\":\"ID of user that we want to find\",\"type\":\"string\"}],\"get\":{\"tags\":[\"Users\"],\"summary\":\"Get user with given ID\",\"responses\":{\"200\":{\"description\":\"User is found\",\"schema\":{\"$ref\":\"#/definitions/User\"}}}},\"delete\":{\"summary\":\"Delete user with given ID\",\"tags\":[\"Users\"],\"responses\":{\"200\":{\"description\":\"User is deleted\",\"schema\":{\"$ref\":\"#/definitions/User\"}}}},\"put\":{\"summary\":\"Update user with give ID\",\"tags\":[\"Users\"],\"parameters\":[{\"name\":\"user\",\"in\":\"body\",\"description\":\"User with new values of properties\",\"schema\":{\"$ref\":\"#/definitions/User\"}}],\"responses\":{\"200\":{\"description\":\"User is updated\",\"schema\":{\"$ref\":\"#/definitions/User\"}}}}}},\"definitions\":{\"User\":{\"required\":[\"email\",\"_id\"],\"properties\":{\"_id\":{\"type\":\"string\",\"uniqueItems\":true},\"email\":{\"type\":\"string\",\"uniqueItems\":true},\"lastName\":{\"type\":\"string\"},\"firstName\":{\"type\":\"string\"}}},\"Users\":{\"type\":\"array\",\"$ref\":\"#/definitions/User\"}}};\n\n//# sourceURL=webpack:///./swagger.json?");

/***/ }),

/***/ "./util/encryption.js":
/*!****************************!*\
  !*** ./util/encryption.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nconst generateSalt = () => {\n  return crypto.randomBytes(128).toString('base64');\n};\n\nconst generateHashedPassword = (salt, password) => {\n  return crypto\n    .createHmac('sha256', salt)\n    .update(password)\n    .digest('hex');\n};\n\nmodule.exports = {\n\tgenerateSalt,\n\tgenerateHashedPassword\n};\n\n\n//# sourceURL=webpack:///./util/encryption.js?");

/***/ }),

/***/ "./validationSchemas/schemas/userValidation.js":
/*!*****************************************************!*\
  !*** ./validationSchemas/schemas/userValidation.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  name: 'userLocalSchema',\n  properties: {\n    username: [\n      {\n        type: 'isEmail',\n        constraints: [],\n        message: 'Должно быть почтой'\n      }\n    ],\n    password: [\n      {\n        type: 'length',\n        constraints: [6, 20],\n        message: 'Должно быть длинной от 6 до 20'\n      },\n      {\n        type: 'isAlphanumeric',\n        constraints: []\n      }\n    ]\n  }\n};\n\n\n//# sourceURL=webpack:///./validationSchemas/schemas/userValidation.js?");

/***/ }),

/***/ "./validationSchemas/validation.module.js":
/*!************************************************!*\
  !*** ./validationSchemas/validation.module.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const classValidator = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst { registerSchema } = classValidator;\n\nconst UserValidationSchema = __webpack_require__(/*! ./schemas/userValidation */ \"./validationSchemas/schemas/userValidation.js\");\n\nregisterSchema(UserValidationSchema);\n\n\n//# sourceURL=webpack:///./validationSchemas/validation.module.js?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi webpack/hot/poll?100 ./bin/www.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! ./bin/www.js */\"./bin/www.js\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"class-validator\");\n\n//# sourceURL=webpack:///external_%22class-validator%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-google-token":
/*!****************************************!*\
  !*** external "passport-google-token" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-google-token\");\n\n//# sourceURL=webpack:///external_%22passport-google-token%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"swagger-ui-express\");\n\n//# sourceURL=webpack:///external_%22swagger-ui-express%22?");

/***/ })

/******/ });