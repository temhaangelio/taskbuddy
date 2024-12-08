const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Varsayılan Metro config'i alın
const defaultConfig = getDefaultConfig(__dirname);

// SVG desteği için gerekli transformer ve resolver ayarları
const svgTransformerConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // 'svg' uzantısını `assetExts` listesinden kaldırıyoruz ve `sourceExts` listesine ekliyoruz
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

// Varsayılan config ile SVG desteğini birleştiriyoruz
const mergedConfig = mergeConfig(defaultConfig, svgTransformerConfig);

// NativeWind desteği ekliyoruz ve yapılandırmayı dışa aktarıyoruz
module.exports = withNativeWind(mergedConfig, { input: './global.css' });
