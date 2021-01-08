module.exports = {
    ci: {
      collect: {
        url: ['http://localhost:8080'],
        // headful: true
      },

      assert: {
        preset: 'lighthouse:no-pwa',
        assertions: {
        'categories:performance': ['warn', {'minScore': 0.9}],
        'categories:accessibility': ['error', {'minScore': 99}],
				"non-composited-animations": "off",
				"valid-source-maps": "off",
				"unsized-images": "off",
          "crawlable-anchors": 'off'
        }
      },

      upload: {
        'target': 'temporary-public-storage'
      }
    }
  };