// 利用可能なモデル一覧を確認するスクリプト
import { prebuiltAppConfig } from '@mlc-ai/web-llm';

console.log('=== WebLLM 利用可能モデル一覧 ===');

if (prebuiltAppConfig && prebuiltAppConfig.model_list) {
    console.log('総モデル数:', prebuiltAppConfig.model_list.length);
    
    // Phiモデルのみフィルタリング
    const phiModels = prebuiltAppConfig.model_list.filter(model => 
        model.model_id.toLowerCase().includes('phi')
    );
    
    console.log('\n🤖 Phiファミリーモデル:');
    phiModels.forEach((model, index) => {
        console.log(`${index + 1}. ${model.model_id}`);
        if (model.model_url) console.log(`   URL: ${model.model_url}`);
        if (model.model_size) console.log(`   Size: ${model.model_size}`);
        console.log('');
    });
    
    // Phi-4を含むモデルをチェック
    const phi4Models = phiModels.filter(model => 
        model.model_id.toLowerCase().includes('phi-4') ||
        model.model_id.toLowerCase().includes('phi4')
    );
    
    console.log('\n🎯 Phi-4関連モデル:');
    if (phi4Models.length > 0) {
        phi4Models.forEach((model, index) => {
            console.log(`${index + 1}. ${model.model_id}`);
        });
    } else {
        console.log('Phi-4モデルは見つかりませんでした');
    }
    
    // 推奨モデルの提案
    console.log('\n💡 推奨モデル:');
    const recommendedModels = phiModels.slice(0, 3);
    recommendedModels.forEach((model, index) => {
        console.log(`${index + 1}. ${model.model_id} (推奨)`);
    });
    
} else {
    console.log('❌ モデル一覧の取得に失敗しました');
}

// 実際に使用するモデルIDのテスト
const testModelIds = [
    "Phi-4-Mini-3.8B-Instruct-q4f32_1-MLC",
    "Phi-3-mini-4k-instruct-q4f16_1-MLC", 
    "Phi-3-medium-4k-instruct-q4f16_1-MLC",
    "Phi-2-q4f16_1-MLC"
];

console.log('\n🧪 テスト対象モデルID:');
testModelIds.forEach((id, index) => {
    const exists = prebuiltAppConfig.model_list.some(model => model.model_id === id);
    console.log(`${index + 1}. ${id} - ${exists ? '✅ 存在' : '❌ 未確認'}`);
});

export { prebuiltAppConfig };