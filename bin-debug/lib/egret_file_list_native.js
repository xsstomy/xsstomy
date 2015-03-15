var egret_file_list = [
	"core/egret/i18n/cn.js",
	"core/egret/utils/Logger.js",
	"core/egret/utils/HashObject.js",
	"core/egret/utils/Recycler.js",
	"core/egret/utils/getTimer.js",
	"core/egret/utils/callLater.js",
	"core/egret/utils/RenderCommand.js",
	"core/egret/events/Event.js",
	"core/egret/events/HTTPStatusEvent.js",
	"core/egret/events/IOErrorEvent.js",
	"core/egret/events/TouchEvent.js",
	"core/egret/events/TimerEvent.js",
	"core/egret/events/TextEvent.js",
	"core/egret/events/ProgressEvent.js",
	"core/egret/events/EventPhase.js",
	"core/egret/events/EventDispatcher.js",
	"core/egret/context/MainContext.js",
	"core/egret/utils/Profiler.js",
	"core/egret/context/Ticker.js",
	"core/egret/layout/HorizontalAlign.js",
	"core/egret/layout/VerticalAlign.js",
	"core/egret/utils/Timer.js",
	"core/egret/utils/getQualifiedClassName.js",
	"core/egret/utils/getDefinitionByName.js",
	"core/egret/utils/setTimeout.js",
	"core/egret/utils/hasDefinition.js",
	"core/egret/utils/toColorString.js",
	"core/egret/geom/Matrix.js",
	"core/egret/geom/Point.js",
	"core/egret/geom/Rectangle.js",
	"core/egret/utils/SAXParser.js",
	"core/egret/context/StageDelegate.js",
	"core/egret/context/renderer/RenderFilter.js",
	"core/egret/utils/Injector.js",
	"core/egret/filters/Filter.js",
	"core/egret/filters/BlurFilter.js",
	"core/egret/display/BlendMode.js",
	"core/egret/display/DisplayObject.js",
	"core/egret/display/DisplayObjectContainer.js",
	"core/egret/display/StageScaleMode.js",
	"core/egret/display/Stage.js",
	"core/egret/display/ScrollView.js",
	"core/egret/display/BitmapFillMode.js",
	"core/egret/display/Bitmap.js",
	"core/egret/text/BitmapText.js",
	"core/egret/display/Graphics.js",
	"core/egret/display/Shape.js",
	"core/egret/display/Sprite.js",
	"core/egret/text/TextField.js",
	"core/egret/text/HtmlTextParser.js",
	"core/egret/text/TextFieldType.js",
	"core/egret/display/SpriteSheet.js",
	"core/egret/text/InputController.js",
	"core/egret/text/BitmapFont.js",
	"core/egret/display/MovieClip.js",
	"core/egret/display/FrameLabel.js",
	"core/egret/display/MovieClipData.js",
	"core/egret/display/MovieClipDataFactory.js",
	"core/egret/context/display/StageText.js",
	"core/egret/net/URLRequestMethod.js",
	"core/egret/net/URLLoaderDataFormat.js",
	"core/egret/net/URLVariables.js",
	"core/egret/net/URLRequestHeader.js",
	"core/egret/net/URLRequest.js",
	"core/egret/net/URLLoader.js",
	"core/egret/display/Texture.js",
	"core/egret/display/RenderTexture.js",
	"core/egret/context/renderer/RendererContext.js",
	"core/egret/context/interactive/InteractionMode.js",
	"core/egret/context/interactive/TouchContext.js",
	"core/egret/context/net/NetContext.js",
	"core/egret/context/devices/DeviceContext.js",
	"core/egret/context/external/ExternalInterface.js",
	"core/egret/context/Browser.js",
	"core/egret/context/localStorage/localStorage.js",
	"core/egret/utils/XML.js",
	"core/egret/utils/ByteArray.js",
	"core/egret/tween/Tween.js",
	"core/egret/tween/Ease.js",
	"core/egret/media/Sound.js",
	"core/jslib/NumberUtils.js",
	"core/egret/context/devices/NativeDeviceContext.js",
	"core/egret/context/renderer/NativeRendererContext.js",
	"core/egret/context/interactive/NativeTouchContext.js",
	"core/egret/context/PromiseObject.js",
	"core/egret/context/net/NativeNetContext.js",
	"core/egret/context/net/NativeResourceLoader.js",
	"core/egret/context/net/VersionController.js",
	"core/egret/context/display/NativeStageText.js",
	"core/extension/resource/events/ResourceEvent.js",
	"core/extension/resource/core/ResourceItem.js",
	"core/extension/resource/core/ResourceConfig.js",
	"core/extension/resource/core/ResourceLoader.js",
	"core/extension/resource/analyzer/AnalyzerBase.js",
	"core/extension/resource/analyzer/BinAnalyzer.js",
	"core/extension/resource/analyzer/ImageAnalyzer.js",
	"core/extension/resource/analyzer/JsonAnalyzer.js",
	"core/extension/resource/analyzer/TextAnalyzer.js",
	"core/extension/resource/analyzer/SheetAnalyzer.js",
	"core/extension/resource/analyzer/FontAnalyzer.js",
	"core/extension/resource/analyzer/SoundAnalyzer.js",
	"core/extension/resource/analyzer/XMLAnalyzer.js",
	"core/extension/resource/Resource.js",
	"core/extension/dragonbones/core/DragonBones.js",
	"core/extension/dragonbones/core/geom/Point.js",
	"core/extension/dragonbones/core/geom/Rectangle.js",
	"core/extension/dragonbones/core/geom/Matrix.js",
	"core/extension/dragonbones/core/events/EventDispatcher.js",
	"core/extension/dragonbones/core/events/Event.js",
	"core/extension/dragonbones/core/events/AnimationEvent.js",
	"core/extension/dragonbones/core/events/ArmatureEvent.js",
	"core/extension/dragonbones/core/events/FrameEvent.js",
	"core/extension/dragonbones/core/animation/WorldClock.js",
	"core/extension/dragonbones/core/animation/TimelineState.js",
	"core/extension/dragonbones/core/animation/AnimationState.js",
	"core/extension/dragonbones/core/animation/Animation.js",
	"core/extension/dragonbones/core/model/ColorTransform.js",
	"core/extension/dragonbones/core/model/DBTransform.js",
	"core/extension/dragonbones/core/model/Frame.js",
	"core/extension/dragonbones/core/model/TransformFrame.js",
	"core/extension/dragonbones/core/model/Timeline.js",
	"core/extension/dragonbones/core/model/TransformTimeline.js",
	"core/extension/dragonbones/core/model/AnimationData.js",
	"core/extension/dragonbones/core/model/DisplayData.js",
	"core/extension/dragonbones/core/model/SlotData.js",
	"core/extension/dragonbones/core/model/BoneData.js",
	"core/extension/dragonbones/core/model/SkinData.js",
	"core/extension/dragonbones/core/model/ArmatureData.js",
	"core/extension/dragonbones/core/model/DragonBonesData.js",
	"core/extension/dragonbones/core/pasers/DataParser.js",
	"core/extension/dragonbones/core/texture/TextureData.js",
	"core/extension/dragonbones/core/factories/BaseFactory.js",
	"core/extension/dragonbones/core/utils/ConstValues.js",
	"core/extension/dragonbones/core/utils/TransformUtil.js",
	"core/extension/dragonbones/core/utils/DBDataUtil.js",
	"core/extension/dragonbones/core/utils/MathUtil.js",
	"core/extension/dragonbones/core/armature/DBObject.js",
	"core/extension/dragonbones/core/armature/Slot.js",
	"core/extension/dragonbones/core/armature/Bone.js",
	"core/extension/dragonbones/core/armature/Armature.js",
	"core/extension/dragonbones/egret/EgretFactory.js",
	"core/extension/dragonbones/egret/EgretSlot.js",
	"core/extension/dragonbones/egret/EgretTextureAtlas.js",
	"core/extension/dragonbones/egret/EgretSheetAtlas.js"
];