FROM envoyproxy/envoy:v1.20.0
COPY ./envoy.yaml /etc/envoy/envoy.yaml

EXPOSE 8080
EXPOSE 9901
EXPOSE 8081
EXPOSE 8082
EXPOSE 8083
EXPOSE 8084

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml