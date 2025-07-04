// WebLLMモデル確認とデバッグ用スクリプト
import { CreateMLCEngine } from '@mlc-ai/web-llm';

class WebLLMDebugger {
    constructor() {
        this.testModelIds = [
            "Phi-4-Mini-3.8B-Instruct-q4f32_1-MLC",  // 現在の実装
            "Phi-3-mini-4k-instruct-q4f16_1-MLC",    // フォールバック1
            "Phi-3-medium-4k-instruct-q4f16_1-MLC",  // フォールバック2
            "Phi-2-q4f16_1-MLC"                      // フォールバック3
        ];
    }

    async testModelAvailability() {
        console.log('🧪 WebLLMモデル可用性テスト開始');
        console.log('=====================================');

        for (const modelId of this.testModelIds) {
            console.log(`\n🔍 テスト中: ${modelId}`);
            
            try {
                // モデルの読み込みテスト（実際にはダウンロードは行わない）
                const startTime = Date.now();
                
                // タイムアウト付きでテスト
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Timeout')), 10000);
                });
                
                const enginePromise = CreateMLCEngine(modelId, {
                    initProgressCallback: (progress) => {
                        console.log(`   進捗: ${(progress.progress * 100).toFixed(1)}%`);
                    }
                });
                
                await Promise.race([enginePromise, timeoutPromise]);
                
                const endTime = Date.now();
                console.log(`   ✅ 成功: ${modelId} (${endTime - startTime}ms)`);
                return modelId; // 最初に成功したモデルを返す
                
            } catch (error) {
                console.log(`   ❌ 失敗: ${modelId}`);
                console.log(`   エラー: ${error.message}`);
                
                // 一般的なエラーパターンの分析
                if (error.message.includes('404') || error.message.includes('Not Found')) {
                    console.log('   💡 原因: モデルが見つかりません（URLが無効）');
                } else if (error.message.includes('WebGPU')) {
                    console.log('   💡 原因: WebGPUサポートの問題');
                } else if (error.message.includes('Memory') || error.message.includes('OOM')) {
                    console.log('   💡 原因: メモリ不足');
                } else if (error.message.includes('Timeout')) {
                    console.log('   💡 原因: タイムアウト（ネットワークまたは処理時間）');
                }
            }
        }
        
        console.log('\n❌ すべてのモデルテストが失敗しました');
        return null;
    }

    async checkWebGPUSupport() {
        console.log('\n🔧 WebGPUサポート確認');
        console.log('========================');
        
        if (typeof navigator === 'undefined') {
            console.log('❌ Navigator未定義（Node.js環境）');
            return false;
        }
        
        if (!navigator.gpu) {
            console.log('❌ WebGPU未サポート');
            console.log('💡 対処法: Chrome Canaryや最新版Chromeを使用');
            return false;
        }
        
        try {
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                console.log('❌ GPUアダプター取得失敗');
                return false;
            }
            
            const device = await adapter.requestDevice();
            if (!device) {
                console.log('❌ GPUデバイス取得失敗');
                return false;
            }
            
            console.log('✅ WebGPU完全サポート');
            console.log(`   アダプター: ${adapter.info ? adapter.info.vendor : 'Unknown'}`);
            return true;
            
        } catch (error) {
            console.log('❌ WebGPU初期化エラー:', error.message);
            return false;
        }
    }

    async runFullDiagnostic() {
        console.log('🏥 WebLLM完全診断開始');
        console.log('====================');
        
        // 1. WebGPUサポート確認
        const webgpuSupported = await this.checkWebGPUSupport();
        
        if (!webgpuSupported) {
            console.log('\n⚠️ WebGPUサポートなし - モデルテストをスキップ');
            return {
                webgpuSupported: false,
                workingModel: null,
                recommendation: 'WebGPU対応ブラウザを使用してください'
            };
        }
        
        // 2. モデル可用性テスト
        const workingModel = await this.testModelAvailability();
        
        // 3. 診断結果の整理
        const result = {
            webgpuSupported,
            workingModel,
            recommendation: this.generateRecommendation(webgpuSupported, workingModel)
        };
        
        console.log('\n📋 診断結果サマリー');
        console.log('==================');
        console.log(`WebGPUサポート: ${webgpuSupported ? '✅' : '❌'}`);
        console.log(`動作するモデル: ${workingModel || '❌ なし'}`);
        console.log(`推奨事項: ${result.recommendation}`);
        
        return result;
    }

    generateRecommendation(webgpuSupported, workingModel) {
        if (!webgpuSupported) {
            return 'WebGPU対応ブラウザ（Chrome/Edge最新版）を使用し、ハードウェアアクセラレーションを有効にしてください';
        }
        
        if (!workingModel) {
            return 'モデル読み込みに失敗しました。インターネット接続とCORSポリシーを確認してください';
        }
        
        if (workingModel === this.testModelIds[0]) {
            return '✅ Phi-4 Miniが正常に動作しています！';
        }
        
        return `フォールバックモデル（${workingModel}）を使用することを推奨します`;
    }
}

// ブラウザ環境でのテスト実行
if (typeof window !== 'undefined') {
    window.WebLLMDebugger = WebLLMDebugger;
    window.runWebLLMTest = async function() {
        const debuggerInstance = new WebLLMDebugger();
        return await debuggerInstance.runFullDiagnostic();
    };
}

export default WebLLMDebugger;