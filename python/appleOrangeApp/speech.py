
import pandas as pd
df = pd.read_csv("./Tweets.csv") # remove unnecessary training code

review_df = df[['text','airline_sentiment']]


review_df = review_df[review_df['airline_sentiment'] != 'neutral']
sentiment_label = review_df.airline_sentiment.factorize()
tweet = review_df.text.values

from tensorflow.keras.preprocessing.text import Tokenizer
tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(tweet)
vocab_size = len(tokenizer.word_index) + 1

encoded_docs = tokenizer.texts_to_sequences(tweet)

from tensorflow.keras.preprocessing.sequence import pad_sequences
padded_sequence = pad_sequences(encoded_docs, maxlen=200)

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM,Dense, Dropout, SpatialDropout1D
from tensorflow.keras.layers import Embedding


embedding_vector_length = 32
model = Sequential()
model.add(Embedding(vocab_size, embedding_vector_length, input_length=200))
model.add(SpatialDropout1D(0.25))
model.add(LSTM(50, dropout=0.5, recurrent_dropout=0.5))
model.add(Dropout(0.2))
model.add(Dense(1, activation='sigmoid'))
model.compile(loss='binary_crossentropy',optimizer='adam', metrics=['accuracy'])

import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences

speech_model = tf.keras.models.load_model('saved_model/speech_model')

def predict_sentiment(text):
    tw = tokenizer.texts_to_sequences([text])
    tw = pad_sequences(tw,maxlen=200)
    prediction = int(speech_model.predict(tw).round().item())
    return sentiment_label[1][prediction]
    
# test_sentence1 = "I enjoyed my journey on this flight."
# predict_sentiment(test_sentence1)


if __name__ == "__main__":
    print(predict_sentiment("im happy"))