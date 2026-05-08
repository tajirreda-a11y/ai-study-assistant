from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():

    data = request.get_json()
    question = data.get("question")

    ollama_response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen2.5:0.5b",
            "prompt": question,
            "stream": False
        }
    )

    answer = ollama_response.json()["response"]

    return jsonify({
        "answer": answer
    })

if __name__ == "__main__":
    app.run(debug=True)