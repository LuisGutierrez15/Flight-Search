FROM gradle:8.14.1-jdk21

WORKDIR /app

COPY . .

RUN chmod +x ./gradlew

CMD [ "./gradlew", "bootRun", "--no-daemon" ]