
import aivm_client as aic


MODEL_NAME = "bert_spam_detection"
onnx_model_path = "/Users/sameehrazak/Downloads/AIVM/backserver/bert_spam_detection.onnx"



aic.upload_bert_tiny_model(onnx_model_path, MODEL_NAME)