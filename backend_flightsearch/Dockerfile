FROM gradle:8.14.1-jdk21

WORKDIR /app

COPY . .

RUN chmod +x ./gradlew

EXPOSE 8080

CMD [ "./gradlew", "bootRun", "--no-daemon" ]

VOLUME [ "/home/gradle/.gradle" ]
