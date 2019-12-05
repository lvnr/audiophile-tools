"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.HeadphoneReview = nexus_1.objectType({
    name: 'HeadphoneReview',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.reviewer();
        t.model.url();
        t.model.video();
        t.model.notes();
        t.model.takeaways();
        t.model.headphone();
        t.model.credibility();
        t.model.priceVsPerf();
        t.model.priceVsPerfUrl();
        t.model.aesthetics();
        t.model.aestheticsUrl();
        t.model.soundstage();
        t.model.soundstageDepth();
        t.model.soundstageWidth();
        t.model.soundstageHeight();
        t.model.soundstageUrl();
        t.model.balanced();
        t.model.balancedUrl();
        t.model.imaging();
        t.model.imagingUrl();
        t.model.separation();
        t.model.separationUrl();
        t.model.bass();
        t.model.bassQty();
        t.model.bassClarity();
        t.model.bassExtension();
        t.model.bassTightness();
        t.model.bassImpact();
        t.model.bassUrl();
        t.model.fun();
        t.model.vocals();
        t.model.midrange();
        t.model.midrangeUrl();
        t.model.treble();
        t.model.trebleExtension();
        t.model.trebleUrl();
        t.model.distortion();
        t.model.distortionUrl();
        t.model.dynamics();
        t.model.dynamicsUrl();
        t.model.detail();
        t.model.detailUrl();
        t.model.microDetail();
        t.model.microDetailUrl();
        t.model.naturalness();
        t.model.naturalnessUrl();
        t.model.smoothess();
        t.model.smoothessUrl();
        t.model.forwardness();
        t.model.forwardnessUrl();
        t.model.speed();
        t.model.speedUrl();
        t.model.warmth();
        t.model.warmthUrl();
        t.model.brigthness();
        t.model.brigthnessUrl();
        t.model.analytical();
        t.model.analyticalUrl();
        t.model.transparency();
        t.model.transparencyUrl();
        t.model.sibilance();
        t.model.sibilanceUrl();
        t.model.nonFatiguing();
        t.model.nonFatiguingUrl();
        t.model.build();
        t.model.buildUrl();
        t.model.comfort();
        t.model.comfortUrl();
        t.model.isolation();
        t.model.isolationUrl();
        t.model.leakage();
        t.model.leakageUrl();
        t.model.matchability();
        t.model.matchabilityUrl();
        t.model.breathability();
        t.model.breathabilityUrl();
        t.model.sourceForgiving();
        t.model.sourceForgivingUrl();
        t.model.cableQuality();
        t.model.cableQualityUrl();
        t.model.noBrainer();
        t.model.noBrainerUrl();
    },
});
